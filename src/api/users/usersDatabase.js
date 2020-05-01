const { UserModel } = require('../../database/models');
const { EMPLOYEE } = require('../../utils/constants')

module.exports = {
    get: options => {
        let query = {};

        if (options.search.name) {
            query.username = new RegExp(options.search.name, 'i');
        }

        return UserModel.find({ ...query, deleted: false })
            .skip(options.from)
            .limit(options.limit)
            .lean()
            .exec();
    },
    count: options => {
        let query = {};

        if (options.search.name) {
            query.username = new RegExp(options.search.name, 'i');
        }

        return UserModel.count({ ...query, delete: false });
    },
    getById: id => UserModel.findById(id).lean().exec(),
    getEmployees: () => UserModel.find({ position: EMPLOYEE }),
    create: user => UserModel.create(user),
    update: (id, newUser) => UserModel.findByIdAndUpdate(id, newUser),
    delete: id => UserModel.findByIdAndUpdate(id, { deleted: true })
}