const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    path: String,
    name:String

})

const File = mongoose.model('Files', fileSchema)



module.exports = File;