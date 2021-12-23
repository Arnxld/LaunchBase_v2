const User = require('../models/User')

module.exports = {
    registerForm(req, res) {
        return res.render("user/register")
    },
    async post(req, res) {
        const userId = await User.create(req.body)

        req.session.userId = userId // adicionando userId ao req.session
        // ao registrar, a sessão está sendo automaticamente criada

        return res.redirect('/users')
    },
    show(req, res) {
        return res.send('cadastrado')
    }
}