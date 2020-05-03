const { ReservationModel } = require('../../database/models');
const { RESERVATION_ACCEPTED } = require('../../utils/constants')

module.exports = {
    get: options => {
        let query = {};

        if (options && options.search && options.search.name) {
            query.clientName = new RegExp(options.search.name, 'i');
        }

        if (options && options.employee && options.employee === 'true') {
            query.reservationStatus = RESERVATION_ACCEPTED
        }
        
        return ReservationModel.find({ ...query })
            .skip(options ? options.from : 0)
            .limit(options ? options.limit : '')
            .populate('file')
            .populate('problem')
            .populate('carBrandId')
            .populate('carModelId')
            .populate('userId')
            .lean()
            .exec();
    },
    count: options => {
        let query = {};

        if (options && options.search && options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return ReservationModel.count({ ...query }).skip(options ? options.from : 0)
            .limit(options ? options.limit : '');
    },
    countByEmployeeId: employeeId => {
        return ReservationModel.count({ userId: employeeId });
    },
    getByEmployeeId: employeeId => ReservationModel.find({ userId: employeeId }).populate('problem').populate('carBrandId').populate('carModelId').populate('userId').lean().exec(),
    getById: id => ReservationModel.findById(id).populate('file').populate('problem').populate('carBrandId').populate('carModelId').populate('userId').lean().exec(),
    create: reservation => ReservationModel.create(reservation),
    update: (id, newReservation) => ReservationModel.findByIdAndUpdate(id, newReservation),
    delete: id => ReservationModel.findByIdAndDelete(id)
}