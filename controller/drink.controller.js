const axios = require('axios');
const Drink = require('../models/drink.model');

const getApi = (req, res) => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
        .then(result => {
            res.status(200).json(result.data.drinks)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

const addDrink = (req, res) => {
    Drink.find({ idDrink: req.body.idDrink })
        .then(found => {
            if (found.length > 0) {
                res.status(401).json("this drinks already exsit")

            } else {
                const {
                    strDrink,
                    strDrinkThumb,
                    idDrink
                } = req.body
                const newDrink = new Drink({
                    strDrink: strDrink,
                    strDrinkThumb: strDrinkThumb,
                    idDrink: idDrink
                })

                newDrink.save()
                    .then(result => {
                        res.status(200).json("done")
                    })
                    .catch(err => {
                        res.status(500).json(err.message)
                    })
            }


        })
        .catch(err => {
            res.status(500).json(err.message)
        })

}



const deleteDrink = (req, res) => {
    Drink.findOneAndDelete({idDrink:req.params.idDrink})
    .then(result=>{
        if (!result) {
            res.status(404).json("not found the drink")
        }else{
            res.status(200).json("deleted")
        }
       
    })
    .catch(err => {
        res.status(500).json(err.message)
    })

}

const updateDrink = (req, res) => {
    Drink.findOneAndUpdate({idDrink:req.params.idDrink})
    .then(result=>{
        console.log(result);
        if (!result) {
            res.status(404).json("not found the drink")
        }else{
            result.strDrink = req.body.strDrink;
            result.strDrinkThumb = req.body.strDrinkThumb;
            result.save()
            res.status(200).json("updated")
            
        }
       
    })
    .catch(err => {
        res.status(500).json(err.message)
    })



}

const getDrink = (req, res) => {
    Drink.find({})
    .then(result=>{
    
            res.status(200).json(result)
       
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
}





module.exports = { getApi ,addDrink,deleteDrink,updateDrink ,getDrink}