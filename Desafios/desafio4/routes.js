const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get("/", function(req, res) {
    res.redirect("/teachers")
})

routes.get("/teachers", teachers.index)

routes.get("/teachers/create", function(req, res) {
    res.render("teachers/create")
})

routes.get("/teachers/:id", teachers.show)

routes.get("/teachers/:id/edit", teachers.edit)

routes.get("/students", function(req, res) {
    res.render("students/index")
})

routes.post("/teachers", teachers.post)

routes.put("/teachers", teachers.put)

routes.delete("/teachers", teachers.delete)

module.exports = routes