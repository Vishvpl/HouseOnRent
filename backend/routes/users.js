const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const express = require('express')
const db = require('../connectDb')


const router = express.Router()

//creating user using POST: users/createuser

router.post('/createuser', (req, res) => {
    req.body.id=null
    const { password } = req.body;
    const salt = crypto.randomBytes(10).toString('hex')
    const hashpswd = crypto.createHash('sha256').update(password + salt).digest('hex')
    req.body.password = hashpswd;
    req.body.salt = salt;
    const sql = 'insert into users set ?'
    db.query(sql, req.body, (err, result) => {
        if (err) {
            // if(err.sqlMessage!=="Incorrect integer value: '' for column 'id' at row 1")
            return res.status(404).send(err)
        }
        
        const data={
            user:{
                id:result.insertId
            }
        }
        const authtoken=jwt.sign(data,'vishvpal')
        return res.status(200).send(authtoken)
    })
})

//user login using POST: users/login

router.post('/login', (req, res) => {
    let { email, password } = req.body;
    const sql1 = 'select salt from users where email=?'
    try {
        db.query(sql1, email, (err, result) => {
            if (err) return res.status(404).json({ error: `login using correct credentials ${err}` })
            const salt = result[0].salt
            password = crypto.createHash('sha256').update(password + salt).digest('hex')
            const sql2 = 'select * from users where email=? and password=?'
            db.query(sql2, [email,password], (err, result) => {
                if (err) return res.status(404).send(err)
                const data={
                    user:{
                        id:result[0].id
                    }
                }
                const authtoken=jwt.sign(data,'vishvpal')
                return res.status(200).send(authtoken)
            })
        })
    } catch (error) {
        res.status(404).send('Internal Server Error')
    }
    
})

module.exports = router;