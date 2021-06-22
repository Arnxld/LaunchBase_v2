const express = require('express')
const nunjucks = require('nunjucks')

const videos = require('./data')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    noCache: true,
})

server.get("/", function(req, res) {
    const about = {
        name: "Mayk Brito",
        image: "https://avatars.githubusercontent.com/u/6643122?v=4",
        role: "Instrutor - Rocketseat",
        description: "Programador full-stack, focado em trazer o melhor ensino para iniciantes. Colaborador da Rocketseat",
        links: {
            github: "",
            instagram: "",
            facebook: "",
        }
    }

    res.render("index", {about})
})

server.get("/portfolio", function(req, res) {
    res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res) {
    const videoId = req.query.id;

    
    const video = videos.find(function(video) {
        if (video.id == videoId) {
            return true
        }
    })

    if(!video) {
        return res.send("Video not found")
    }

    return res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("Server is running")
})