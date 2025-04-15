const express=require('express')
const cors=require('cors')
const path=require('path')
const {Server}=require('socket.io')
const http=require('http')

const app=express()
const server=http.createServer(app)
const io=new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  })

app.use(cors())
app.use('/houseimages',express.static(path.join(__dirname,'houseimages')))

app.use(express.json())
// url: /houses/...
app.use('/houses',require('./routes/houses'))

//url: /users/...
app.use('/users',require('./routes/users'))

io.on('connection',(socket)=>{
    console.log('socket connected')
    socket.on('send',(msg)=>{
        socket.broadcast.emit('recieve',msg)
    })
})

server.listen(3001,()=>{
    console.log('app is listening on port 3001')
})
