const database = require('./carProblemsDatabase');

module.exports = {
    get: options => {
        return Promise.all([
            database.get(options),
            database.count(options)
        ]).then(promiseArray => Promise.resolve({
            carProblems: promiseArray[0],
            count: promiseArray[1]
        }))
    },
    getById: id => database.getById(id),
    create: problem => database.create(problem),
    delete: id => database.delete(id),
    update: (id, newProblem) => database.update(id, newProblem)
}