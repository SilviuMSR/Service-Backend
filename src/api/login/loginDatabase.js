const { UserModel } = require('../../database/models/index')

let database = {
    findUser: username => {
        return UserModel.findOne({
            username: username,
            deleted: false
        })
    }
}

module.exports = database