const reservationLogic = require('../reservations/reservationsLogic')
const userLogic = require('../users/usersLogic')
const brandsLogic = require('../carBrands/carBrandsLogic')
const modelLogic = require('../carModels/carModelsLogic')

const moment = require('moment')
const CONSTANTS = require('../../utils/constants')

statisticsLogic = {
    getForReservations: async () => {
        const allReservations = await reservationLogic.get()

        const resultJson = {}
        const currentDate = moment()

        // Compute json with needed data for statistics
        resultJson.allReservationsCount = allReservations.count
        resultJson.doneReservations = allReservations.reservations.filter(reservation => reservation.reservationStatus.toLowerCase() === CONSTANTS.RESERVATION_DONE.toLowerCase()).length
        resultJson.acceptedReservations = allReservations.reservations.filter(reservation => reservation.reservationStatus.toLowerCase() === CONSTANTS.RESERVATION_ACCEPTED.toLowerCase()).length
        resultJson.inProgressReservations = allReservations.reservations.filter(reservation => reservation.reservationStatus.toLowerCase() === CONSTANTS.RESERVATION_IN_PROGRESS.toLowerCase()).length
        resultJson.declinedReservations = allReservations.reservations.filter(reservation => reservation.reservationStatus.toLowerCase() === CONSTANTS.RESERVATION_DECLINED.toLowerCase()).length

        resultJson.reservationsForDays = []
        // Compute reservations based on created date
        for (let i = 14; i >= 0; i--) {
            const dateForReservation = moment(currentDate).subtract(i, 'days').format('YYYY-MM-DD')
            const validReservations = allReservations.reservations.filter(reservation => moment(reservation.createdAt, 'YYYY-MM-DD').isSame(dateForReservation))
            resultJson.reservationsForDays.push({ date: dateForReservation, nrOfReservations: validReservations.length })
        }

        return resultJson
    },
    getForEmployee: async () => {
        const allReservations = await reservationLogic.get()
        const employees = await userLogic.getEmployees()

        const resultJson = {}
        resultJson.reservationsPerEmployee = []

        for (const employee of employees) {
            const validReservations = allReservations.reservations.filter(reservation => reservation.userId && (reservation.userId.username.toLowerCase() === employee.username.toLowerCase())).length
            const doneReservations = allReservations.reservations.filter(reservation => reservation.userId && (reservation.userId.username.toLowerCase() === employee.username.toLowerCase()) && reservation.reservationStatus === CONSTANTS.RESERVATION_DONE).length
            resultJson.reservationsPerEmployee.push({ employee: employee.username, nrOfReservations: validReservations, done: doneReservations })
        }

        resultJson.reservationsPerEmployee = resultJson.reservationsPerEmployee.sort((a, b) => a.nrOfReservations < b.nrOfReservations ? 1 : -1)

        return resultJson

    },
    getForCarsAndProblems: async () => {
        const allReservations = await reservationLogic.get()
        const brands = await brandsLogic.get()

        const resultJson = {}
        resultJson.reservationsPerModel = []
        resultJson.reservationsPerBrand = []
        resultJson.reservationsPerProblem = []

        for (const brand of brands.brands) {

            const validBrandReservations = allReservations.reservations.filter(reservation => reservation.carBrandId &&
                (reservation.carBrandId.name.toLowerCase() === brand.name.toLowerCase())).length
            resultJson.reservationsPerBrand.push({ brand: brand.name, nrOfReservations: validBrandReservations })

            const associatedModels = await modelLogic.getByBrandId(brand._id)
            if (associatedModels && associatedModels.length) {
                for (const model of associatedModels) {
                    const validReservations = allReservations.reservations.filter(reservation => reservation.carBrandId &&
                        (reservation.carBrandId.name.toLowerCase() === brand.name.toLowerCase() &&
                            reservation.carModelId.name.toLowerCase() === model.name.toLowerCase())).length
                    resultJson.reservationsPerModel.push({ model: model.name, brand: brand.name, nrOfReservations: validReservations })
                }
            }
        }

        // Map every reservation to its problems
        const mappedReservations = allReservations.reservations.map(res => res.problem)

        // For each reservation
        for (const reservation of mappedReservations) {
            // For each problem of that reservation
            for (const problem of reservation) {
                // Check if is not included in our result json
                if (!resultJson.reservationsPerProblem.map(field => field.problem).includes(problem.name)) {
                    // If not push it there with nr of reservations = 1
                    resultJson.reservationsPerProblem.push({ problem: problem.name, nrOfReservations: 1 })
                }
                else {
                    // If it is already there, find its position
                    const currentProblemIndex = resultJson.reservationsPerProblem.findIndex(index => index.problem === problem.name)
                    if (currentProblemIndex > -1) {
                        // If position is successfully find make a copy of the json and increase the number of reservations
                        const jsonCopy = resultJson.reservationsPerProblem.map(field => ({ ...field }))
                        jsonCopy[currentProblemIndex].nrOfReservations = jsonCopy[currentProblemIndex].nrOfReservations + 1
                        resultJson.reservationsPerProblem = jsonCopy
                    }
                }
            }
        }

        // Sort arrays
        resultJson.reservationsPerBrand = resultJson.reservationsPerBrand.sort((a, b) => a.nrOfReservations < b.nrOfReservations ? 1 : -1)
        resultJson.reservationsPerProblem = resultJson.reservationsPerProblem.sort((a, b) => a.nrOfReservations < b.nrOfReservations ? 1 : -1)

        return resultJson
    }
}

module.exports = statisticsLogic