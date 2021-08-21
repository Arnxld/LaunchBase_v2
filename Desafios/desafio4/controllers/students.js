const data = require("../data.json")
const fs = require('fs')
const {age, date, grade} = require('../utils')

exports.index = function(req, res) {
    let students = data.students

    students = students.map(function(student) {

        student = {
            ...student,
            grade: grade(student.grade)
        }

        return student
    })

    console.log(students)

    res.render("students/index", {students})
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return id == student.id
    })
 
    if(!foundStudent) return res.send("student not found")

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        grade: grade(foundStudent.grade),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at)
    }

    return res.render("students/show", {student})
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Preencha todos os campos")
        }
    }

    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if(lastStudent) {
        id = lastStudent.id + 1
    }

    const birth = Date.parse(req.body.birth)
    const created_at = Date.now()

    data.students.push({
        id,
        ...req.body,
        birth,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Ocorreu um erro')

        return res.redirect("/students")
    })
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return id == student.id
    })

    if(!foundStudent) return res.send("student not found")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render("students/edit", {student})
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if(student.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send("student not found")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error")

        return res.redirect(`/students/${id}`)

    })


    
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error")

        return res.redirect("/students")
        
    })
}