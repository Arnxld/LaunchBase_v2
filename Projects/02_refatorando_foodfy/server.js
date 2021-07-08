const express = require('express')
const nunjucks = require('nunjucks')

const recipes = require('./data')

const server = express()

server.set("view engine", "njk")
server.use(express.static('public'))

nunjucks.configure("views", {
    express: server
})

server.get("/", function(req, res) {
    res.render('home', {recipes})
})

server.get("/about", function(req, res) {
    res.render("about")
})

server.get("/recipes", function(req, res) {
    res.render('recipes', {recipes})
})

server.get("/recipes/:id", function(req, res) {
    const id = req.params.id

    const recipe = recipes[id]

    res.render('recipe', {recipe})
})

server.listen(5000, function() {
    console.log('server executing...')
})