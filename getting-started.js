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


//REMAKE THE RECIPE WE DID IN SQL BUT WITH MONGOOSE USING ONLY 2 RECPIES
    /* schema for ingredients */
    const ingredientSchema = new mongoose.Schema({
        ingredients: [{
            ingredientName : String,
            measurement : String,
            amount : Number,
        }]
    });
    /* schema  for recipes*/ 
    const recipeSchema = new mongoose.Schema({
        name : {type: String, required: true, maxlength: 100},
        description : {type: String, required: true, maxlength: 250},
        instructions : {type: String, required: true, maxlength: 750},
        ingredients : [ingredientSchema],
        /*ingredients: [{
            ingredientName: String,
            measurement: String,
            amount: Number,
        }],*/
        
        
    });
    
    

    //method, the makeIT function to make sure things are running
    recipeSchema.methods.makeIT = function(){
    let name;

    if (this.name) {
        name = "This is a recipe for" + this.name;
    } else {
        name = "I'm not real";
    }
    console.log(name);
    }
    //create a model
    const Recipe = mongoose.model('Recipe', recipeSchema);

    //documents - ALL THE RECIPES
    const topRamen = new Recipe ({
        name: "Chicken Top Ramen",
        description: "Cheap fake noodles for college students",
        instructions: "Put noodles in pot, then add water and bring to boil, drain noodles, do not wash them, let sit for 3 minutes and then enjoy.",
        ingredients: [{
            ingredientName: "Noodles",
            measurement: "whole",
            amount: 1,
        },
        
        {
            ingredientName: "Seasoning Packet",
            measurement: "whole",
            amount: 1,
        },
        
        {
            ingredientName: "water",
            measurement: "Cups",
            amount: 2,
        }],

    });
        //console.log(topRamen);
    const macAndCheese = new Recipe ({
        name: "Mac N Cheese",
        description: "Enough to clog your arteries!",
        instructions: "Put noodles in pot, boil hot water till noodles are soft, drain noodles, dO nOt RiNsE, ADD cheese butter and milk into pot, stir and enjoy!",
        ingredients: [{
            ingredientName: "Water",
            measurement: "Cups",
            amount: 3,
        },
        {
            ingredientName: "Milk",
            measurement: "Cups",
            amount: 1,
        },
        {
            ingredientName: "Elbow Noodles",
            measurement: "Cups",
            amount: 4,
        },
        {
            ingredientName: "Butter",
            measurement: "Tablespoons",
            amount: 16,
        },
        {
            ingredientName: "cheesey sauccceeee pack",
            measurement: "whole",
            amount: 1,
        }],

    });

    //save recipes to db
    topRamen.save(function(err, recipe){
        //return error code if not saved
        if (err) return console.error(err);
        recipe.test();
    });

    macAndCheese.save(function(err, recipe){
        if (err) return console.error(err);
        recipe.test();
    });
    //find all the recipes and print error out if it isnt found
    
    /*topRamen.test();
    macAndCheese.test();
    console.log(topRamen);
    console.log(macAndCheese);*/
//using the create method to make a new recipe
    Recipe.create(
        {name:"Reeses Puffs Cereal",
        description: "Peanut butter chocolate flavor!",
        instructions: "Put cereal into bowl, fill bowl with all the milk, eat with spoon or hands whatever you choose.",
        ingredients: [{
            ingredientName : "Milk",
            measurement: "Cups",
            amount: 3,
        },
        {
            ingredientName: "Reeses Puffs",
            measurement: "Cups",
            amount: 2,
        }],
    
    
    }, 
    
    function(err,) {
        if (err) return console.error(err);
        console.log();
    });
//finding the recipes with ingredients
    Recipe.find(function(err,recipe){
        if (err) return console.error(err);
        console.log(recipe[0].ingredients[0]);
    });
//calling the test method to print
topRamen.test();
//update name in topRamen recipe    
topRamen.name = "Everything a college kid could ask for!";
    
    
    Recipe.find(function(err,recipe){
        if (err) return console.error(err);
        console.log(recipe);
    });
//delete the lazy recipe I made
    Recipe.deleteOne({ name: "Reeses Puffs Cereal"}, function(err){
        if (err) console.error(err);
        console.log("Delete");
    });
    
    Recipe.find(function(err,recipe){
        if (err) return console.error(err);
        console.log(recipe);
    });
    //update function 
     /*Recipe.updateOne({macAndCheese}, { amount: -1},function(err){
         if (err) return console.error(err);
         console.log(Recipe[1]);
         //macAndCheese.ingredients;
     });*/

});

