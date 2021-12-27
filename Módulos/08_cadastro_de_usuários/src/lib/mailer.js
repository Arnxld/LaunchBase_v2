const nodemailer =  require('nodemailer')

// usando mailtrap.io para receber os emails (DEV)

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "37ba136e40020f",
      pass: "e7784b35d3696e"
    }
});