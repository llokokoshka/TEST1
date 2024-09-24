const {Schema, model} = require('mongoose')

const answers = new Schema (
   { name: String,
    answers: [String]
    }
)

module.exports = model('answers', answers)