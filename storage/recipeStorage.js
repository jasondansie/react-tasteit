const recipes = require('./recipeDB.json');
const fs = require('fs').promises;

const  { adapt } = require('./dataAdapter');

const getAllRecipes = () => {
    return recipes;
}

function getRecipe(key, value){
    const found = [];
    if (key && value) {
        for(const recipe of recipes){
            if (recipe[key] === value) {
                found.push(recipe);
            }
        }
    }
    return found;
}

const writeStorage = async (data) => {
    console.log("writing:", data);
    try {
        await fs.writeFile('./storage/recipeDB.json', JSON.stringify(data, null, 4), {
            encoding:'utf8',
            flag:'w'
        });
        return true;
    } 
    catch (error) {
        return false;
    }
}

const addToStorage = async (data) => {

    let storageData =[];
    storageData = recipes;
    
    storageData.push(adapt(data));

    return await writeStorage(storageData);
}

module.exports = { getAllRecipes, getRecipe, addToStorage }