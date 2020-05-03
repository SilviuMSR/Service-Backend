const { CarProblemModel } = require('../../database/models');

module.exports = {
    get: options => {
        let query = {};

        if (options && options.search && options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return CarProblemModel.find({ ...query, deleted: false })
            .skip(options ? options.from : 0)
            .limit(options ? options.limit : '')
            .lean()
            .exec();
    },
    count: options => {
        let query = {};

        if (options && options.search && options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return CarProblemModel.count({ ...query, deleted: false }).skip(options ? options.from : 0)
            .limit(options ? options.limit : '');
    },
    getById: id => CarProblemModel.findById(id),
    create: problem => CarProblemModel.create(problem),
    update: (id, newProblem) => {
        return CarProblemModel.findByIdAndUpdate(id, newProblem)
    },
    delete: id => CarProblemModel.findByIdAndUpdate(id, { deleted: true })
}