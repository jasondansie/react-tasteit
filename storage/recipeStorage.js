const recipes = require('./recipeDB.json');
const path = require('path');
const fs = require('fs').promises;

const { storageFile, adapterfile, key } = require('./storageConfig.json');

const { readStorage, writeStorage } = require('./readerWriter');

const  { adapt } = require(path.join(__dirname, adapterfile));

const getAllFromStorage = async () => {
    return readStorage(storageFilePath);
}

const storageFilePath = path.join(__dirname, './recipeDB.json');

console.log("storageFilePath: ", storageFilePath);

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

const addToStorage = async (data) => {

    let storageData =[];
    storageData = await readStorage(storageFilePath);
    console.log(storageData);
    
    storageData.push(data);

    return await writeStorage(storageFilePath, storageData);

    // try {
    //     await fs.writeFile('./recipeDB.json', JSON.stringify(storageData, null, 4), {
    //         encoding:'utf8',
    //         flag:'w'
    //     });
    //     return true;
    // } 
    // catch (error) {
    //     return error;
    // }
}

addToStorage(
    {
        "id": 6,
        "name": "Pizza",
        "author": "",
        "country": "Peru",
        "flag": "https://flagcdn.com/w320/pe.png",
        "Description": "FPS",
        "image": "https://www.w3schools.com/howto/img_avatar.png",
        "ingredients": "",
        "instructions": ""
    }
).then(console.log).catch(console.log);

module.exports = { getAllRecipes, getRecipe }