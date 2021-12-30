const User = require('../models/User')
const {compare} = require('bcryptjs')

async function login(req, res, next) {
    const {email, password} = req.body

    const user = await User.findOne({where: {email}})
    
    if(!user) return res.render("session/login", {
        user: req.body,
        error: "Usuário não cadastrado"
    })

    const passed = await compare(password, user.password)

    if(!passed) return res.render("session/login", {
        user: req.body,
        error: "Senha incorreta"
    })

    req.user = user

    next()
}

async function forgot(req, res, next) {
    const {email} = req.body

    try {
        let user = await User.findOne({where: {email}})

        if(!user) return res.render("session/forgot-password", {
            user: req.body,
            error: "Email não cadastrado"
        })

        req.user = user

        next()
    } catch (err) {
        console.error(err)
    }
}

async function reset(req, res, next) {
    let { email, password, token } = req.body

    // procurar usuário
    let user = await User.findOne({where: {email}})

    if(!user) return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Usuário não cadastrado"
    })

    // senhas combinam
    const passed = await compare(password, user.password)

    if(!passed) return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Senha incorreta"
    })

    // token combina
    if(token != user.reset_token) return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Token inválido! Solicite uma nova recuperação de senha"
    })

    // token não expirou
    let now = new Date()
    now = now.setHours(now.getHours())

    if ( now > user.reset_token_expires ) return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Token expirado! Solicite uma nova recuperação de senha"
    })

    req.user = user
    next()
}

module.exports = {
    login,
    forgot,
    reset
}