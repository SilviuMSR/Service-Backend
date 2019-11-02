const { CarBrandModel } = require('../../database/models');

module.exports = {
    get: options => {
        let query = {};

        if (options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return CarBrandModel.find({ ...query })
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

        return CarBrandModel.count({ ...query });
    },
    getById: id => CarBrandModel.findById(id),
    create: brand => CarBrandModel.create(brand),
    update: (id, newBrand) => CarBrandModel.findByIdAndUpdate(id, newBrand),
    delete: id => CarBrandModel.findByIdAndDelete(id)
}