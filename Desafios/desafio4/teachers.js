const data = require("./data.json")
const fs = require('fs')
const {age, graduation, date} = require('./utils')


exports.show = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id
    })

    if(!foundTeacher) return res.send("teacher not found")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        education: graduation(foundTeacher.education),
        area: foundTeacher.area.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return res.render("teachers/show", {teacher})
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Preencha todos os campos")
        }
    }

    let {avatar_url, name, birth, education, class_type, area} = req.body

    const id = Number(data.teachers.length + 1)
    birth = Date.parse(birth)
    const created_at = Date.now()

    data.teachers.push({
        id,
        name,
        avatar_url,
        birth,
        education,
        class_type,
        area,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Ocorreu um erro')

        return res.redirect("/teachers")
    })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher) {
        return id == teacher.id
    })

    if(!foundTeacher) return res.send("teacher not found")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }


    console.log(teacher.birth)

    return res.render("teachers/edit", {teacher})
}