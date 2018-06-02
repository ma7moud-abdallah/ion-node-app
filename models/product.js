const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    number:{type:Number},
    services :{type:Number},
    bill : {type:Number},
    selected: {type:Boolean , default:false}
})

module.exports = mongoose.model('Product',productSchema)