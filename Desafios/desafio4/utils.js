module.exports = {
    age: function(timestamp) {
        const birthDate = new Date(timestamp)
        const today = new Date()

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }

        return age
    },

    graduation: function(education) {
        switch (education) {
            case 'school': return 'Ensino Médio Completo'
            case 'undergraduation': return 'Ensino Superior Completo'
            case 'graduation': return 'Mestrado'
            case 'phd': return 'Mestrado'
        }
    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
        
    }
}