const { PieceModel } = require('../../database/models');

module.exports = {
    get: options => {
        let query = {};

        if (options.search.name) {
            query.name = new RegExp(options.search.name, 'i');
        }

        return PieceModel.find({ ...query })
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

        return PieceModel.count({ ...query });
    },
    getById: id => PieceModel.findById(id),
    create: piece => PieceModel.create(piece),
    update: (id, newPiece) => PieceModel.findByIdAndUpdate(id, newPiece),
    delete: id => PieceModel.findByIdAndDelete(id)
}