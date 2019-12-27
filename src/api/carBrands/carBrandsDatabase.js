const { CarBrandModel } = require('../../database/models');

module.exports = {
    get: options => {
        let query = {};

        if (options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return CarBrandModel.find({ ...query, deleted: false })
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

        return CarBrandModel.count({ ...query, deleted: false });
    },
    getById: id => CarBrandModel.findById(id),
    create: brand => CarBrandModel.create(brand),
    update: (id, newBrand) => CarBrandModel.findByIdAndUpdate(id, newBrand),
    delete: id => CarBrandModel.findByIdAndUpdate(id, { deleted: true })
}