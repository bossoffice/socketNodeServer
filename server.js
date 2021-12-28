const express = require('express')
const app = express()

const http = require('http')
const https = require('https')
serverHttp = http.createServer(app)
// serverHttps = https.createServer(options, app)

const { Server } = require("socket.io")
const io = new Server(serverHttp, {
    cors: {
        // origin: "http://localhost:3030",
        // methods: ["GET", "POST"]
    }
})

var cors = require('cors')

// middleware
app.use(function (req, res, next) {

    //     //     // Website you wish to allow to connect
    //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030')

    //     // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    //     // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    //     // Set to true if you need the website to include cookies in the requests sent
    //     // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true)

    //     // Pass to next layer of middleware
    next()
})
// app.use(cors({ origin: 'http://127.0.0.1:3030' }))
app.use(cors())

// constant
const _portHttp = 3000
// const _portHttps = 3001

app.get('/', (req, res) => {
    res.status(200).json({ "msg": "success" })
})


// open connection for socket io
io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('chat', (msg) => {
        console.log(`mesasge : ${msg}`)
        socket.emit('chat', `server send back : msg`)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

// http
serverHttp.listen(_portHttp, () => {
    console.log(`http on http://localhost:${_portHttp}`)
})

// // https
// serverHttps.listen(_portHttps, () => {
//     console.log(`https on http://localhost:${_portHttps}`)
// })