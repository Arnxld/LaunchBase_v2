// métodos para todos os outros models
const db = require("../../config/db")

function find(filters, table) {
    let query = `SELECT * FROM ${this.table}`

    if(filters) {
        Object.keys(filters).map(key => {
            //WHERE | OR | AND
            query += `${key}`
    
            Object.keys(filters[key]).map(field => {
                query += `${field} = '${filters[key][field]}'`
            })
        })
    }

    
    return db.query(query)
}

const Base = {
    init({ table }) {
        if(!table) throw new Error('Invalid Params')

        this.table = table
    },
    async find(id) {
        const results = await find({where: {id}}, this.table)

        return results.rows[0]
    },
    async findOne(filters) {
        const results = await find(filters, this.table)

        return results.rows[0]
    },
    async findAll(filters) {
        const results = await find(filters, this.table)

        return results.rows
    },
    async create(fields) {
        try {
            let keys = [],
                values = []

            Object.keys(fields).map(key => {
                keys += `${key}`
                values += `${fields[key]}`
            })

            const query = `INSERT INTO ${this.table} (${keys.join(',')})
                VALUES(${values.join(',')})
                RETURNING id
            `

            const results = await db.query(query)
            return results.rows[0].id

        } catch(err) {
            console.error(err)
        }
    },
    update(id, fields) {
        try{
            let update = []
            Object.keys(fields).map(key => {
                // category_id=($1)
                const line = `${key} = '${fields[key]}'`
                update.push(line)
                
            })
    
            let query = `UPDATE ${this.table} SET
            ${update.join(',')} WHERE id = ${id}
            `
    
            db.query(query)
            
        } catch(err) {
            console.error(err)
        }
    },
    delete(id) {
        return db.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
    },
}

module.exports = Base