const User = require('../models/User')

const crypto = require("crypto")
const { hash } = require("bcryptjs")
const mailer = require('../../lib/mailer')


module.exports = {
    loginForm(req, res) {
        return res.render("session/login")
    },
    login(req, res) {
        req.session.userId = req.user.id

        return res.redirect("/users")
    },
    logout(req, res) {
        req.session.destroy()
        return res.redirect("/")
    },
    forgotForm(req, res) {
        return res.render("session/forgot-password")
    },
    async forgot(req, res) {
        const { user } = req
        try {
            
            // token para o usuário
            const token = crypto.randomBytes(20).toString("hex")
            
            // criar expiração do token
            let now = new Date()
            
            now = now.setHours(now.getHours() + 1)
            
            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })
            
            // enviar email com o link de recuperação de senha
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@launchstore.com.br',
                subject: 'Recuperação de senha',
                html: `<h2>Perdeu a chave?</h2>
                <p>Clique no link abaixo para recuperar sua senha</p>
                <p>
                <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                recuperar senha
                </a>
                </p>
                `
            })
            
            // avisar o usuário que o email foi enviado
            return res.render("session/forgot-password", {
                success: "Verifique seu email para resetar a senha"
            })
        } catch(err) {
            console.error(err)
            return res.render("session/forgot-password", {
                error: "erro inesperado, tente novamente!"
            })
        }
    },
    resetForm(req, res) {
        return res.render("session/password-reset", {token: req.query.token})
    },
    async reset(req, res) {
        const { user } = req
        const { password, token } = req.body

        try {
            // cria novo hash de senha
            const newPassword = await hash(password, 8)

            // atualiza o usuário
            await User.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: "",
            })

            // avisa que trocou a senha

            return res.render("session/login", {
                user:req.body,
                success: "Senha atualizada! Faça o seu login"
            })

        } catch(err) {
            console.error(err)
            return res.render("session/forgot-password", {
                user: req.body,
                token,
                error: "erro inesperado, tente novamente!"
            })
        }
    }
}