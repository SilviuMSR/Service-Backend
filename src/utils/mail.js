const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'servicetestdev@gmail.com',
        pass: 'mailpassworddontshow'
    }
});

//Default config for sending mail, can be overwritten by options
var mailOptions = {
    from: 'servicetestdev@gmail.com',
    to: 'manzursilviu@gmail.com',
    subject: 'Example title',
    text: 'Example mail text.'
};

module.exports = {
    sendMail: options => new Promise((resolve, reject) => transporter.sendMail({ ...mailOptions, ...options }, (err, info) => {
        if (err) return reject(err)
        return resolve(info)
    }))
}