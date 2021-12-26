const req = require("express/lib/request")
const res = require("express/lib/response")

module.exports = {
    loginForm(req, res) {
        return res.render("session/index")
    },
    logout(req, res) {
        req.session.destroy()
        return res.redirect("")
    }
}