const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express()
app.use(express.json())


const {getApi ,addDrink ,deleteDrink,updateDrink ,getDrink} = require('./controller/drink.controller')
mongoose.connect(process.env.URL_MONGODB, {useNewUrlParser: true, useUnifiedTopology: true});

// git Api drinks
app.get('/drinks',getApi );

// add new drink
app.post('/add',addDrink );

// delete drink
app.delete('/delete/:idDrink',deleteDrink );

// update drink
app.put('/update/:idDrink',updateDrink );

// get all drinks
app.get('/alldrinks',getDrink );




// get error url 
app.get('*', (req,res)=>{
    res.status(404).json("Page not found")
})
app.listen(process.env.PORT || 8080 , ()=>{
    console.log(`connect with PORT ${process.env.PORT}`);
})