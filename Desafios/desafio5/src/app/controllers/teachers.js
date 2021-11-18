const {age, graduation, date} = require('../../lib/utils')
const Teacher = require('../models/Teacher')

module.exports = {
    index(req, res) {
        const {filter} = req.query

        if (filter) {
            Teacher.findBy(filter, function(teachers) {
                return res.render("teachers/index", {teachers})
            })
        } else {
            Teacher.all(function(teachers) {
                return res.render("teachers/index", {teachers})
            })
        }
    },

    create(req, res) {
        return res.render("teachers/create")
    },


    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos")
            }
        }

        Teacher.create(req.body, function(id) {
            return res.redirect(`/teachers/${id}`)
        })
    },

    show(req, res) {
        const { id } = req.params

        Teacher.find(id, function(teacher) {

            teacher.education = graduation(teacher.education)
            teacher.age = age(Date.parse(teacher.birth))
            teacher.area = teacher.area.split(",")

            return res.render('teachers/show', {teacher})
        })
    },

    edit(req, res) {
        const { id } = req.params

        Teacher.find(id, function(teacher) {

            teacher.birth = date(Date.parse(teacher.birth)).iso

            return res.render('teachers/edit', {teacher})
        })
    },

    put(req, res) {
        Teacher.update(req.body, function() {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },

    delete(req, res) {
        Teacher.delete(req.body.id, function() {
            return res.redirect('/teachers')
        })
    }
}