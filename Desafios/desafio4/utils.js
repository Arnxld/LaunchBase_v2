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

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }   
    },

    grade: function(grade) {
        switch (grade) {
            case '5EF': return '5º Ano do Ensino Fundamental'
            case '6EF': return '6º Ano do Ensino Fundamental'
            case '7EF': return '7º Ano do Ensino Fundamental'
            case '8EF': return '8º Ano do Ensino Fundamental'
            case '9EF': return '9º Ano do Ensino Fundamental'
            case '1EM': return '1º Ano do Ensino Médio'
            case '2EM': return '2º Ano do Ensino Médio'
            case '3EM': return '3º Ano do Ensino Médio'
        }
    }
}