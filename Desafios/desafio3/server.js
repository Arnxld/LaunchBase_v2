const express = require("express")
const nunjucks = require("nunjucks")

const data = require('./data')

const server = express()

server.set("view engine", "njk")

server.use(express.static('public'))

nunjucks.configure("views", {
    express:server
})

server.get("/", function(req, res) {
    res.render("courses", {data})
})

server.get("/about", function(req, res) {
    res.render("about", {data})
})

server.get("/posts/:id", function(req, res) {
    const id = req.params.id;

    const post = data.posts.find(function(post) {
        if (post.id == id) {
            return true;
        }
    })

    res.render("post-page", {post})
})

server.use(function(req, res) {
    res.status(404).render("not-found");
});

server.listen(5000, function() {
    console.log("server is running")
})