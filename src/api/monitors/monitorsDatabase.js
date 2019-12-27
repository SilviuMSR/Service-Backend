const { MonitorModel } = require('../../database/models');

module.exports = {
    get: options => {
        let query = {};

        if (options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return MonitorModel.find({ ...query, deleted: false })
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

        return MonitorModel.count({ ...query, deleted: false });
    },
    getById: id => MonitorModel.findById(id),
    create: monitor => MonitorModel.create(monitor),
    update: (id, newMonitor) => MonitorModel.findByIdAndUpdate(id, newMonitor),
    delete: id => MonitorModel.findByIdAndUpdate(id, { deleted: true })
}