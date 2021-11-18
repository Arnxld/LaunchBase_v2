const { age, grade, date } = require("../../lib/utils");
const Student = require("../models/Student");

module.exports = {
  index(req, res) {
    Student.all(function (students) {
      return res.render("students/index", { students });
    });
  },

  create(req, res) {
    Student.teacherSelectOptions(function (teacherOptions) {
      return res.render("students/create", { teacherOptions });
    });
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os campos");
      }
    }

    Student.create(req.body, function (id) {
      return res.redirect(`/students/${id}`);
    });
  },

  show(req, res) {
    const { id } = req.params;

    Student.find(id, function (student) {
      student.age = age(Date.parse(student.birth));
      student.grade = grade(student.grade);

      return res.render("students/show", { student });
    });
  },

  edit(req, res) {
    const { id } = req.params;

    Student.find(id, function (student) {
      student.birth = date(Date.parse(student.birth)).iso;
      Student.teacherSelectOptions(function (teacherOptions) {
        return res.render("students/edit", { student, teacherOptions });
      });
    });
  },

  put(req, res) {
    Student.update(req.body, function () {
      return res.redirect(`/students/${req.body.id}`);
    });
  },

  delete(req, res) {
    Student.delete(req.body.id, function () {
      return res.redirect("/students");
    });
  },
};
