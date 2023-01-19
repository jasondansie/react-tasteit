const recipes = require('./recipeDB.json');

const getAllRecipes = () => {
    return recipes;
}

function getRecipe(key, value){
    console.log("key: ", key);
    console.log("value: ", value);
    const found = [];
    if (key && value) {
        for(const recipe of recipes){
            if (recipe[key] === value) {
                found.push(recipe);
            }
        }
    }
    console.log("found: ", found);
    return found;
}

console.log(getRecipe("id", 1));

module.exports = { getAllRecipes, getRecipe }