const mongoose = require('mongoose');


const drinkSchema = mongoose.Schema({
    strDrink : String,
    strDrinkThumb : String,
    idDrink : {type:String, unique : true }
})

module.exports = mongoose.model('drink',drinkSchema);