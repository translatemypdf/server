const route = require('express').Router()
const ControllerFile = require('../controllers/fileController')
const gcsMiddlewares = require('../middlewares/google-cloud-storage')

const Multer = require('multer')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024 // maximum file 10mb
    }
})
route.post('/upload', multer.single('file'), gcsMiddlewares.sendUploadToGCS, ControllerFile.upload)
route.get('/', ControllerFile.findFile)

route.post('/translatemanual', ControllerFile.getTranslate)
route.post('/translate', ControllerFile.translateplease)
route.post('/scan', ControllerFile.scanme)
module.exports = route