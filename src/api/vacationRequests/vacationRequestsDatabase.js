const { VacationRequestModel } = require('../../database/models')

module.exports = {
    get: options => {
        let query = {};

        if (options && options.search && options.search.name) {
            query.reason = new RegExp(options.search.name, 'i');
        }

        if (options && options.employee && options.employee.length) {
            query.userId = options.employee
        }

        return VacationRequestModel.find({ ...query, deleted: false })
            .skip(options ? options.from : 0)
            .limit(options ? options.limit : '')
            .populate('userId', 'username email')
            .lean()
            .exec();
    },
    count: options => {
        let query = {};

        if (options.search.name) {
            query.username = new RegExp(options.search.name, 'i');
        }

        if (options && options.employee && options.employee.length) {
            query.userId = options.employee
        }

        return VacationRequestModel.count({ ...query, delete: false });
    },
    getById: id => VacationRequestModel.findById(id).populate('userId', 'username email').lean().exec(),
    create: newVacationRequest => VacationRequestModel.create(newVacationRequest),
    update: (id, newVacationRequest) => VacationRequestModel.findByIdAndUpdate(id, newVacationRequest),
    delete: id => VacationRequestModel.findByIdAndUpdate(id, { deleted: true })
}