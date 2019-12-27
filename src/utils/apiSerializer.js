module.exports = {
    apiSerializer: (promise, res) => {
        let done = response => res.done(response)
        let error = err => res.err(err)

        if (promise) {
            return promise
                .then(response => {
                    return res.done(response)
                })
                .catch(err => res.err(err))
        } else return { done, error }
    },
}