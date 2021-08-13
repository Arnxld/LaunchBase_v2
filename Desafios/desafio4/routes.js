const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get("/", function(req, res) {
    res.redirect("/teachers")
})

routes.get("/teachers", function(req, res) {
    res.render("teachers/index")
})

routes.get("/teachers/create", function(req, res) {
    res.render("teachers/create")
})

routes.get("/teachers/:id", teachers.show)

routes.get("/teachers/:id/edit", teachers.edit)

routes.get("/students", function(req, res) {
    res.render("students/index")
})

routes.post("/teachers", teachers.post)

module.exports = routes