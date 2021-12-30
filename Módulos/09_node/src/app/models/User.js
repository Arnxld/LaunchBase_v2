const Base = require('../models/Base')

Base.init({ table: 'users'})

const User = {
    ...Base,
}

module.exports = User


    
    
    // async delete(id) {
    //     

    // }