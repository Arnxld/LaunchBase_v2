const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM students`, function(err, results) {
            if (err) throw `Database Error! ${err}`
            
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO students (
            avatar_url,
            name,
            email,
            birth,
            grade,
            class_hours,
            teacher_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.grade,
            data.class_hours,
            data.teacher_id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0].id)
        })
    },

    find(id, callback) {
        db.query(`SELECT students.*, teachers.name AS teacher_name
        FROM students
        LEFT JOIN teachers ON students.teacher_id = teachers.id 
        WHERE students.id = $1`, [id], function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query =`
        UPDATE students SET
            avatar_url = ($1),
            name = ($2),
            email = ($3),
            birth = ($4),
            grade = ($5),
            class_hours = ($6),
            teacher_id = ($7)
        WHERE id = $8 
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(Date.parse(data.birth)).iso,
            data.grade,
            data.class_hours,
            data.teacher_id,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },
    
    teacherSelectOptions(callback) {
        db.query(`SELECT id, name FROM teachers`, function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    }
    
}