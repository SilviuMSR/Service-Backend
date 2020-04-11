const multer = require('multer')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const uuid = require('uuid')
const CONSTANTS = require('./constants')

const upload = destination => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination)
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${path.extname(file.originalname)}`)
        }
    }),
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname).toLowerCase()
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
})

const resizeImages = destination => async (req, res, next) => {
    if (!req.files) return next()

    try {
        await Promise.all([
            ...req.files.map(file => {
                let currentFilePath = `${destination}/${file.filename}`
                let newFileName = `${Date.now()}${uuid.v4()}${path.extname(file.filename)}`
                let newFilePath = `${destination}/${newFileName}`

                //overwrite with new file name
                file.filename = newFileName
                file.path = newFilePath

                //resize and delete old file
                return sharp(currentFilePath)
                    .resize({ width: CONSTANTS.DEFAULT_IMAGE_WIDTH, withoutEnlargement: true })
                    .toFormat('jpeg')
                    .toFile(newFilePath).then(() => new Promise((resolve, reject) => {
                        fs.unlink(currentFilePath, err => {
                            if (err) return reject(err)
                            else return resolve()
                        })
                    }))
            })
        ])
    } catch (e) {
        return next(new Error(e))
    }

    next()
}

module.exports = {
    upload,
    resizeImages
}