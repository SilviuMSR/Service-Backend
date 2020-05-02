const userLogic = require('../users/usersLogic')
const vacationRequestLogic = require('./vacationRequestsLogic')
const { USER_STATUS: { ON_VACATION }, VACATION_REQUEST_STATUS: { ACCEPTED } } = require('../../utils/constants')
const mailService = require('../../utils/mail')

let facade = {
    create: async vacationRequest => {
        if (!vacationRequest.userId) return

        return await vacationRequestLogic.create(vacationRequest)
    },
    update: async (id, newVacation) => {
        const currentVacation = await vacationRequestLogic.getById(id)
        if (!currentVacation) return

        if (newVacation.requestStatus === ACCEPTED) {
            const updatedUser = await userLogic.update(currentVacation.userId, { userStatus: ON_VACATION })
            await mailService.sendMail({
                to: updatedUser.email,
                subject: 'STATUS VACATION REQUEST',
                text: `Your request from ${currentVacation.from} to ${currentVacation.to} with reason ${currentVacation.reason} was ACCEPTED`
            })
        }
        else {
            await mailService.sendMail({
                to: currentVacation.userId.email,
                subject: 'STATUS VACATION REQUEST',
                text: `Your request from ${currentVacation.from} to ${currentVacation.to} with reason ${currentVacation.reason} was DECLINED`
            })
        }

        return await vacationRequestLogic.update(id, { ...currentVacation, requestStatus: newVacation.requestStatus })
    }
}

module.exports = facade