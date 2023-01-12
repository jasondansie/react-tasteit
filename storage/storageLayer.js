'use strict';

const path = require('path');

const { storageFile, adapterfile, key } = require('./storageConfig.json');

const { readStorage, writeStorage } = require('./readerWriter');

const storageFilePath = path.join(__dirname, storageFile);

const  { adapt } = require(path.join(__dirname, adapterfile));

const getAllFromStorage = async () => {
    return readStorage(storageFilePath);
}

const getFromStorageWithNumber = async (number) =>{
    return (await readStorage(storageFilePath)).find(item =>item[key] == number) || null;
}

const addToStorage = async (newEntry) => {
    const storageData = await readStorage(storageFilePath);
    
    storageData.push(adapt(newEntry));
    
    return await writeStorage(storageFilePath, storageData);
}

const updateEntry = async (entry) => {
    const storageData = await readStorage(storageFilePath);
    const currentEntry = storageData.find(item => item[key] == entry[key]); // this is a reference to the entry in the array. 
    
    if (currentEntry) {
        Object.assign(currentEntry, adapt(entry)); // this updates the item in the array directly.
        return await writeStorage(storageFilePath, storageData);
    }
    
    return false; // we don't update if it's not found
}

const deleteEntry = async (id) => {
    const storageData = await readStorage(storageFilePath);
    const i = storageData.findIndex(item => item[key] === id);
    
    if (i < 0) {
        return false;
    }
    storageData.splice(i,1);

    return await writeStorage(storageFilePath, storageData);
}

module.exports = { getAllFromStorage, getFromStorageWithNumber, addToStorage, updateEntry, deleteEntry }
