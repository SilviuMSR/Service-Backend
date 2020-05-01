const userLogic = require('../users/usersLogic')
const vacationRequestLogic = require('./vacationRequestsLogic')
const { USER_STATUS: { ON_VACATION }, VACATION_REQUEST_STATUS: { ACCEPTED } } = require('../../utils/constants')

let facade = {
    create: async vacationRequest => {
        if (!vacationRequest.userId) return

        return await vacationRequestLogic.create(vacationRequest)
    },
    update: async (id, newVacation) => {
        const currentVacation = await vacationRequestLogic.getById(id)
        if (!currentVacation) return

        await vacationRequestLogic.update(id, { ...currentVacation, requestStatus: newVacation.requestStatus })

        if (newVacation.requestStatus === ACCEPTED) {
            return await userLogic.update(currentVacation.userId, { userStatus: ON_VACATION })
        }
    }
}

module.exports = facade