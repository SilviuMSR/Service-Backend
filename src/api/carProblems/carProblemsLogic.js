const database = require('./carProblemsDatabase');

const logic = {
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
    update: async (id, body, modifySteps) => {
        if (!modifySteps) return database.update(id, body.problem)

        // Edit steps case
        let currentProblem = await logic.getById(id)
        let steps = currentProblem.steps
        let stepPosition = steps.findIndex(step => step.toLowerCase() === body.stepAfter.toLowerCase())
        if (stepPosition > -1) {
            steps.splice(stepPosition + 1, 0, body.newStep)
        }

        let updatedProblem = {
            ...body.problem,
            steps: steps
        }

        return database.update(id, updatedProblem)
    }
}

module.exports = logic