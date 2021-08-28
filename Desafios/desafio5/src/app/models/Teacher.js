const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM teachers`, function(err, results) {
            if (err) throw `Database Error! ${err}`
            
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO teachers (
            avatar_url,
            name,
            birth,
            education,
            class_type,
            area
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education,
            data.class_type,
            data.area
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0].id)
        })
    },

    find(id, callback) {
        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query =`
        UPDATE teachers SET
            avatar_url = ($1),
            name = ($2),
            birth = ($3),
            education = ($4),
            class_type = ($5),
            area = ($6)
        WHERE id = $7 
        `

        const values = [
            data.avatar_url,
            data.name,
            date(Date.parse(data.birth)).iso,
            data.education,
            data.class_type,
            data.area,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    },

    delete(id, callback) {
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database Error! ${err}`

            callback()
        })
    }
    
}