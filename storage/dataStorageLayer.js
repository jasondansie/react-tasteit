'use strict';

const {CODES, MESSAGES} = require('./statusCodes');

const { getAllFromStorage, getFromStorageWithNumber, addToStorage, updateEntry, deleteEntry } = require('./storageLayer');

//Datastorage class

module.exports = class Datastorage{
    get CODES(){
        return CODES;
    }

    getAll(){
       return getAllFromStorage();
    }

    getOne(id){
        return new Promise(async (resolve, reject) => {
            if (!id) {
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else{
                const result = await getFromStorageWithNumber(id);
                if (result) {
                    resolve(result);
                }
                else{
                    reject(MESSAGES.NOT_FOUND(id));
                }
            }
        });
    }

    insert(entry){
        console.log("entry:", entry);
        return new Promise(async (resolve, reject) => {
            if (entry) {
               if (!entry.id) {
                    reject(MESSAGES.NOT_INSERTED());
               } 
               else if(await getFromStorageWithNumber(entry.id)){
                reject(MESSAGES.ALREADY_IN_USE(entry.id));
               }
               else if(await addToStorage(entry)){
                  resolve(MESSAGES.INSERT_OK(entry.id));
               }
               else{
                reject(MESSAGES.NOT_INSERTED());
               }
            }
            else{
                reject(MESSAGES.NOT_INSERTED());
            }
        });
    }

    update(entry){
        return new Promise(async (resolve, reject) => {
            if (entry) {
                if (await updateEntry(entry)) {
                    resolve(MESSAGES.UPDATE_OK(entry.id));
                }
                else{
                    reject(MESSAGES.NOT_UPDATED());
                }
            }
            else{
                reject(MESSAGES.NOT_UPDATED());
            }
        })
    }

    remove(id){
        return new Promise(async (resolve, reject) => {
            if (!id) {
                reject(MESSAGES.NOT_FOUND(id));
            }
            else if(await deleteEntry(id)){
                resolve(MESSAGES.REMOVE_OK(id));
            }
            else{
               reject(MESSAGES.NOT_REMOVED(id)); 
            }
        })
    }
}