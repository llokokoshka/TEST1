const {Schema, model} = require('mongoose')

const results = new Schema (
   {points: Number}
)

module.exports = model('results', results)