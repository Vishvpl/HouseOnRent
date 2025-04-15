const mysql=require('mysql')

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'open',
    database: 'houses'
})

db.connect((err)=>{
    if(err){
        throw err
    }
    console.log('connected to database successfully !!!')
})


module.exports=db;