const { CarModelModel } = require('../../database/models');

module.exports = {
    get: options => {
        let query = {};

        if (options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return CarModelModel.find({ ...query, deleted: false })
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

        return CarModelModel.count({ ...query, deleted: false });
    },
    getById: id => CarModelModel.findById(id),
    getByBrandId: id => CarModelModel.find({ carBrandId: id, deleted: false }),
    create: model => CarModelModel.create(model),
    update: (id, newModel) => CarModelModel.findByIdAndUpdate(id, newModel),
    delete: id => CarModelModel.findByIdAndUpdate(id, { deleted: true })
}