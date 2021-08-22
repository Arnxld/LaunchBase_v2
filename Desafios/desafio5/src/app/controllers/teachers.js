const {age, graduation, date} = require('../lib/utils')

module.exports = {
    index(req, res) {
        return res.render("teachers/index")
    },

    create(req, res) {
        return res.render("teacher/create")
    },

    post(req, res) {
        const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Preencha todos os campos")
        }
    }

    let {avatar_url, name, birth, education, class_type, area} = req.body
    },
 
    show(req, res) {
        const { id } = req.params

        return
    },

    edit(req, res) {
        return
    },

    put(req, res) {
        return
    },

    delete(req, res) {
        return
    }
}