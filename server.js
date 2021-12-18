const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url)
})

const port = process.env.PORT || 3000

server.listen(port)

console.log('Server started')