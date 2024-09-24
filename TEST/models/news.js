const {Schema, model} = require('mongoose')

const news = new Schema (
   {
       Header: String,
       textofNews: String,
        imageSrc: {
            type: String,
            default: ''
        }
    }
)

module.exports = model('news', news)