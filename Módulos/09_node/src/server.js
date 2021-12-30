const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const methodOverride = require('method-override')
const session = require('./config/session')
const server = express()

server.use(session) // agora req.session está disponível no servidor
server.use((req, res, next) => { // com esse middleware de variavel global, por meio do res.locals, a session estará disponível na template engine (nunjucks)
    res.locals.session = req.session
    next()
})
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    noCache: true,
})

server.listen(5000, function () {
    console.log("Server is running")
})