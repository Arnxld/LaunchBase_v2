const User = require('../models/User')
const {compare} = require('bcryptjs')

function checkAllFields(body) {
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "") {
            return  {
                user: body,
                error: 'Todos os campos devem estar preenchidos'
            }
        }
    }
}

async function show(req, res, next) {
    const {userId: id} = req.session

    const user = await User.findOne({where: {id}})
    
    if(!user) return res.render("user/register", {
        error: "Usuário não encontrado"
    })

    req.user = user

    next()
}

async function post(req, res, next) {
    console.log(req.body)

    // check if all fields are filled
    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) {
        return res.render("user/register", fillAllFields)
    }

    // check if users already exists [email, cpf_cnpj]
    let {email, cpf_cnpj, password, passwordRepeat} = req.body

    cpf_cnpj.replace(/D/g, "")

    const user = await User.findOne({
        where: {email},
        or: {cpf_cnpj}
    })

    if (user) return res.render('user/register', {
        user: req.body,
        error: 'Usuário já cadastrado.'
    })

    // check if passwords match
    if(password != passwordRepeat) return res.render('user/register', {
        user: req.body,
        error: 'As senhas não combinam.'
    })

    next()
}

async function update(req, res, next) {
    // check if all fields are filled
    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) {
        return res.render("user/index", fillAllFields)
    }

    // has password
    const {id, password} = req.body

    if(!password) return res.render("user/index", {
        user: req.body,
        error: "Coloque sua senha para alterar seus dados"
    })

    // password match
    const user = await User.findOne({where: {id}})

    const passed = await compare(password, user.password)

    if(!passed) return res.render("user/index", {
        user: req.body,
        error: "Senha incorreta"
    })

    req.user = user

    next()
}

module.exports = {
    post,
    show,
    update
}