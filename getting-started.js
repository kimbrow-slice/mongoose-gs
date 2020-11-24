//const is just another let
//we declare a constant variable called mongoose
//we set it equal to the return value of require('mongoose');
const mongoose = require('mongoose'); 

//access the connect method of the mongoose object
//pass in the localhost test database
//and some options inside of another object
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

//make another constant variable called db
//adn we set it equal to connection property of our mongoose object
const db = mongoose.connection;

//but then we access the on and once methods of our connection property from our mongoose object
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    //your tutorial and new code go here. 
    console.log("We're connected");

//REMAKE THE RECIPE WE DID IN SQL BUT WITH MONGOOSE USING ONLY 2 RECPIES
    /* schema */
    const recipeSchema = new mongoose.Schema({
        name : String,
        description : String,
        ingredients : [ingredientSchema],
        instructions : String
    });
    const ingredientSchema = new mongoose.Schema({
        name: String,
        measurement : String,
        amount : Number
    });

    
    /* model */
    const Recipe = mongoose.model('Chicken Top Ramen', recipeSchema);

    /* document */
    let topRamen = new Recipe({ name : 'Chicken Top Ramen' , description : 'Cheap fake noodles for college students!', instructions: 'Put noodles in pot, then add water and bring to boil, drain noodles, do not wash them, let sit for 3 minutes and then enjoy.', 
    ingredients: [      
        {name: 'Noodle Packet',
        measurement : 'Packet',
        amount : 1},
    
    
       { name: 'Seasoning Packet',
        measurement : 'Packet',
        amount : 1 }   
    ]
 
    });




    
})
