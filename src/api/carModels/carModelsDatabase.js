const { CarModelModel } = require('../../database/models');

module.exports = {
    get: options => {
        let query = {};

        if (options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return CarModelModel.find({ ...query })
            .skip(options.from)
            .limit(options.limit)
            .lean()
            .exec();
    },
    count: options => {
        let query = {};

        if (options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return CarModelModel.count({ ...query });
    },
    getById: id => CarModelModel.findById(id),
    create: model => CarModelModel.create(model),
    update: (id, newModel) => CarModelModel.findByIdAndUpdate(id, newModel),
    delete: id => CarModelModel.findByIdAndDelete(id)
}