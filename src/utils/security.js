const crypto = require('crypto')
const config = require('../../config/config')

module.exports = {
    login: {
        hash: password => crypto.createHash(config.encrypt.loginAlgorithm).update(
            password
        ).digest(config.encrypt.loginOutputType)
    }
}