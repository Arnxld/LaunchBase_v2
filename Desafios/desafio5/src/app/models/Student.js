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
            class_hours
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.grade,
            data.class_hours
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0].id)
        })
    },

    find(id, callback) {
        db.query(`SELECT * FROM students WHERE id = $1`, [id], function(err, results) {
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
            class_hours = ($6)
        WHERE id = $7 
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(Date.parse(data.birth)).iso,
            data.grade,
            data.class_hours,
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
    }
    
}