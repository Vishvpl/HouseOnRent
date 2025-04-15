const express=require('express')
const db=require('../connectDb')
const fetchuser = require('../middlewares/fetchuser')
const router=express.Router()
const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:'./houseimages/',
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage:storage
}).single('image')

//get all houses using GET: houses/gethouses
router.get('/gethouses',(req,res)=>{
    const sql='select * from house'
    db.query(sql,(err,result)=>{
        if(err) return res.status(404).json({error:'some error occured'})
        res.status(200).json(result)
    })
})

router.get('/myhouses',fetchuser,(req,res)=>{
    const sql='select * from house where user_id=?'
    db.query(sql,req.user,(err,result)=>{
        if (err) return res.status(404).json({error:'some error occured',err})
        return res.status(200).json(result)
    })
})

//saving house image in houseimages
router.post('/uploadimage',(req,res)=>{
    upload(req,res,(err)=>{
        if(err) return res.send('fail to upload')
        res.send('Image uploaded Successfully')
    })
})

//uploading house using POST: houses/createhouse
router.post('/createhouse',fetchuser,(req,res)=>{
    req.body.id=null;
    const {id,rent,address,url}=req.body
    const sql=`insert into house (id,rent,address,url,user_id) values(?,?,?,?,?)`
    db.query(sql,[id,rent,address,url,req.user],(err,result)=>{
        if(err) throw err;
    })
    return res.status(200).json({message:'uploaded successfully'})
})

//scheduling a visit using POST: houses/visit
router.post('/visit/:id',fetchuser,(req,res)=>{
    const {visit_date,visit_time}=req.body;
    const sql='insert into visitors (user_id,house_id,visit_date,visit_time) values (?,?,?,?)';
    db.query(sql,[req.user,req.params.id,visit_date,visit_time],(err,result)=>{
        if(err) return res.status(404).json({error:'some error occured'})
        return res.status(200).send('request made for scheduling the visit')
    })
})

//deleting a visit using DELETE: houses/deletevisit
router.delete('/deletevisit/:id',fetchuser,(req,res)=>{
    const sql='delete from visitors where user_id=? and house_id=?'
    db.query(sql,[req.user,req.params.id],(err,result)=>{
        if(err) return res.status(404).json({error:'some error occured'})
        return res.status(200).send('Your visit has been cancelled')
    })
})
module.exports=router