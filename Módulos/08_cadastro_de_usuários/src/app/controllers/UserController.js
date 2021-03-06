const User = require('../models/User')
const { formatCep, formatCpfCnpj} = require('../../lib/utils')
const res = require('express/lib/response')
const req = require('express/lib/request')

module.exports = {
    registerForm(req, res) {
        return res.render("user/register")
    },
    async post(req, res) {
        try {

            console.log(req.body)
        
            const userId = await User.create(req.body)

            req.session.userId = userId // adicionando userId ao req.session
            // ao registrar, a sessão está sendo automaticamente criada

            return res.redirect('/users')
        } catch (err) {
            return res.render("user/register", {
                user: req.body,
                error: "Algo de errado aconteceu! tente novamente."
            })
        }
    },
    async show(req, res) {
        const { user } = req

        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        user.cep = formatCep(user.cep)

        return res.render('user/index', {user})
    },
    async update(req, res) {
        try {

            const { user } = req
            let { name, email, cpf_cnpj, cep, address } = req.body
            cpf_cnpj = cpf_cnpj.replace(/D/g, "")
            cep = cep.replace(/D/g, "")

            await User.update(user.id, {
                name,
                email,
                cpf_cnpj,
                cep,
                address
            })

            return res.render("user/index", {
                user: req.body,
                success: "Conta atualizada com sucesso!"
            })

        } catch(err) {
            console.error(err)
            return res.render('user/index', {
                error: "Algum erro aconteceu!"
            })
        }
    },
    async delete(req, res) {
        try {
            await User.delete(req.body.id)
            req.session.destroy()
            
            return res.render("session/login", {
                success: "conta deletada com sucesso"
            })
        } catch(err) {
            console.error(err)
            return res.render("user/index", {
                user: req.body,
                error: "Erro ao tentar deletar sua conta"
            })
        }
    }
}