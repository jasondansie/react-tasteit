const {CODES, MESSAGES} = require('./statusCodes');

const { getAllFromStorage, getFromStorageWithNumber, addToStorage } = require('./storageLayer');

//Datastorage class

module.exports = class Datastorage{
    static get CODES(){
        return CODES;
    }

    getAll(){
       return getAllFromStorage();
    }

    getOne(id){
        return new this.Promise( (resolve, reject) => {
            if (!id) {
                reject(MESSAGES.NOT_FOUND('---empty---'));
            }
            else{
                const result =  getFromStorageWithNumber(id);
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
        return new this.Promise(async (resolve, reject) => {
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

    getSize(){
        let data = this.getAllFromStorage();
        return data.getSize();
     }
}