const helpers = require('../../utils/helpers')

module.exports = {
    start: () => {
        helpers.checkForNotifications()
        return Promise.resolve({})
    },
    stop: () => {
        helpers.clearNotifications()
        return Promise.resolve({})
    },
    update: settings => {
        helpers.updateSettings(settings)
        return Promise.resolve({})
    },
    get: () => {
        return Promise.resolve({ settings: helpers.getSettings() })
    }
}