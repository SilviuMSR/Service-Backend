const { CarBrandModel } = require('../../database/models');

module.exports = {
    get: options => {
        let query = {};

        if (options && options.search && options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return CarBrandModel.find({ ...query, deleted: false })
            .skip(options ? options.from : 0)
            .limit(options ? options.limit : '')
            .lean()
            .exec();
    },
    count: options => {
        let query = {};

        if (options && options.search && options.search.name) {
            query.name = new RegExp(options.search.name, 'i')
        }

        return CarBrandModel.count({ ...query, deleted: false }).skip(options ? options.from : 0)
            .limit(options ? options.limit : '');
        ;
    },
    getById: id => CarBrandModel.findById(id),
    create: brand => CarBrandModel.create(brand),
    update: (id, newBrand) => CarBrandModel.findByIdAndUpdate(id, newBrand),
    delete: id => CarBrandModel.findByIdAndUpdate(id, { deleted: true })
}