const {Schema, model} = require('mongoose')

const photos = new Schema (
   { 
    imageSrc: {
        type: String,
        default: ''
    }
    }
)

module.exports = model('photos', photos)