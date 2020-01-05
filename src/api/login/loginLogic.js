const httpStatus = require('http-status')
const database = require('./loginDatabase')
const security = require('../../utils/security')
const bcrypt = require('bcryptjs');

let logic = {
	login: (username, password) => {
		return database.findUser(username)
			.then(user => {
				if (!user) return Promise.reject({ status: httpStatus.BAD_REQUEST })
				let valid = bcrypt.compare(password, user.password);
				if (valid) {
					return Promise.resolve({
						id: user.id,
						username: user.username
					})
				}
				return Promise.reject({ status: httpStatus.BAD_REQUEST })
			})
	}
}

module.exports = logic