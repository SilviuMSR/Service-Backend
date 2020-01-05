const { FileModel } = require('../../database/models/index')

module.exports = {
	create: file => FileModel.create(file)
}	