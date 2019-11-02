const { ReservationModel } = require('../../database/models');

module.exports = {
    get: options => {
        let query = {};

        if (options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return ReservationModel.find({ ...query })
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

        return ReservationModel.count({ ...query });
    },
    getById: id => ReservationModel.findById(id),
    create: reservation => ReservationModel.create(reservation),
    update: (id, newReservation) => ReservationModel.findByIdAndUpdate(id, newReservation),
    delete: id => ReservationModel.findByIdAndDelete(id)
}