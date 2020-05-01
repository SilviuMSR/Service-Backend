const { VacationRequestModel } = require('../../database/models')

module.exports = {
    get: options => {
        let query = {};

        if (options.search.name) {
            query.username = new RegExp(options.search.name, 'i');
        }

        return VacationRequestModel.find({ ...query, deleted: false })
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

        return VacationRequestModel.count({ ...query, delete: false });
    },
    getById: id => VacationRequestModel.findById(id).lean().exec(),
    create: newVacationRequest => VacationRequestModel.create(newVacationRequest),
    update: (id, newVacationRequest) => VacationRequestModel.findByIdAndUpdate(id, newVacationRequest),
    delete: id => VacationRequestModel.findByIdAndUpdate(id, { deleted: true })
}