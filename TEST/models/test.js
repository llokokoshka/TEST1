const {Schema, model} = require('mongoose')

const quiz = new Schema({
    textOfQuestion: String,
    answers: String,
    imageSrc: {
        type: String,
        default: ''
    }
 
})
const tests = new Schema({
    name: String,
    questions: [quiz]
})

module.exports = model('tests', tests)

