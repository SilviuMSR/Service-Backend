const { PieceModel } = require('../../database/models');

module.exports = {
    get: options => {
        let query = {};

        if (options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return PieceModel.find({ ...query, deleted: false })
            .populate('carBrandId', 'name')
            .populate('carModelId', 'name')
            .skip(options ? options.from : 0)
            .limit(options ? options.limit : '')
            .lean()
            .exec();
    },
    getByBarCode: id => {
        return PieceModel.find({ code: id, deleted: false })
            .populate('carBrandId', 'name')
            .populate('carModelId', 'name')
            .lean()
            .exec();
    },
    count: options => {
        let query = {};

        if (options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return PieceModel.count({ ...query, deleted: false }).skip(options.from)
            .limit(options.limit);
    },
    getById: id => PieceModel.findById(id),
    create: piece => PieceModel.create(piece),
    update: (id, newPiece) => PieceModel.findByIdAndUpdate(id, newPiece),
    delete: id => PieceModel.findByIdAndUpdate(id, { deleted: true })
}