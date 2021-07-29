const express = require("express")
const nunjucks = require("nunjucks")


const server = express()

server.set("view engine", "njk")

server.use(express.static('public'))

nunjucks.configure("views", {
    express:server
})

server.get("/", function(req, res) {
    res.redirect("/teachers")
})

server.get("/teachers", function(req, res) {
    res.render("teachers/index")
})

server.get("/students", function(req, res) {
    res.render("students/index")
})

server.use(function(req, res) {
    res.status(404).render("not-found");
});

server.listen(5000, function() {
    console.log("server is running")
})