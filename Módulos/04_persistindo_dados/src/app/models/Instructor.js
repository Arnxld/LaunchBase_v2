const db = require("../../config/db")
const { age, date } = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`SELECT instructors.*, count(members) AS total_students
        FROM instructors
        LEFT JOIN members ON (members.instructor_id = instructors.id)
        GROUP BY instructors.id 
        ORDER BY total_students ASC`, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    
    create(data, callback) {
        const query = `
            INSERT INTO instructors (
                avatar_url,
                name,
                birth,
                gender,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            date(Date.now()).iso
        ]

        console.log(values)

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0].id)
        })
    },

    find(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function(err, results) {
            console.log(id)
            if(err) throw `Database Error! ${err}`


            callback(results.rows[0])
        })
    },

    findBy(filter, callback) {
        db.query(`SELECT instructors.*, count(members) AS total_students
        FROM instructors
        LEFT JOIN members ON (members.instructor_id = instructors.id)
        WHERE instructors.name ILIKE '%${filter}%'
        OR instructors.services ILIKE '%${filter}%'
        GROUP BY instructors.id 
        ORDER BY total_students ASC`, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },

    update(data, callback) {
        const query = `
        UPDATE instructors SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            gender=($4),
            services=($5)
        WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    
    delete(id, callback) {
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error! ${err}`
            
            callback()
        })
    },

    paginate(params) {
        let { filter, limit, offset, callback} = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM instructors
            ) AS total`

        if ( filter ) {
            filterQuery = `
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.services ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM instructors
                ${filterQuery}
            ) AS total`
        }
        
        query = `
        SELECT instructors.*, ${totalQuery}, count(members) AS total_students
        FROM instructors
        LEFT JOIN members ON (instructors.id = members.instructor_id)
        ${filterQuery}
        GROUP BY instructors.id LIMIT $1 OFFSET $2
        `
        db.query(query, [limit, offset], function(err, results) {
            if (err) throw `Database Error! ${err}`
            
            callback(results.rows)
        })
    }
}