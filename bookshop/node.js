const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {

    switch(true) {
        case req.url === "/" && req.method === "GET":
            res.setHeader("content-type", "text/html")
            res.writeHeader(200)
            fs.readFile('./bookshop/bookshop.html', (err, file) => {
                res.end(file)
            })
        break
        case req.url === "/bookshopMain.js" && req.method === "GET":
            res.setHeader("content-type", "application/javascript")
            res.writeHeader(200)
            fs.readFile('./bookshop/bookshopMain.js', (err, file) => {
                res.end(file)
            })
        break
        case req.url === "/components/sign-in.js" && req.method === "GET":
            res.setHeader("content-type", "application/javascript")
            res.writeHeader(200)
            fs.readFile('./bookshop/components/sign-in.js', (err, file) => {
                res.end(file)
            })
        break
        case req.url === "/bookshopStyle.css" && req.method === "GET":
            res.setHeader("content-type", "text/css")
            res.writeHeader(200)
            fs.readFile('./bookshop/bookshopStyle.css', (err, file) => {
                res.end(file)
            })
        break
        default:
            res.setHeader("content-type", "text/html")
            res.writeHeader(404)
            res.end("Error... mistyped url")
    }

})

server.listen(3000)