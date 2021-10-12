import  { openDB } from 'idb';

const DB_NAME = 'student-tracker';
const DB_VERSION = 1;
const USER_STORE = 'users';
const TEMP_USER_STORE = 'temp_users';
const GROUP_STORE = 'groups';
const TEMP_GROUP_STORE = 'temp_groups';
const INTERACTION_STORE = 'interactions'
const TEMP_INTERACTION_STORE = 'temp_interactions'
const NOTE_STORE = 'notes'
const TEMP_NOTE_STORE = 'temp_notes'
const TIME_PERIOD_STORE = 'time_periods'
const GROUP_TYPE_STORE = 'group_type'
const ROLE_STORE = 'roles'


function init(dbname = DB_NAME, dbversion = DB_VERSION){
    let dbPromise = openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
        var userStore = db.createObjectStore(USER_STORE);
        var tempUserStore = db.createObjectStore(TEMP_USER_STORE,  { keyPath: "id", autoIncrement:true });
        var groupStore = db.createObjectStore(GROUP_STORE);
        var tempGroupStore = db.createObjectStore(TEMP_GROUP_STORE, { keyPath: "id", autoIncrement:true });
        var interactionStore = db.createObjectStore(INTERACTION_STORE);
        var tempInteractionStore = db.createObjectStore(TEMP_INTERACTION_STORE,  { keyPath: "id", autoIncrement:true });
        var noteStore = db.createObjectStore(NOTE_STORE);
        var tempNoteStore = db.createObjectStore(TEMP_NOTE_STORE,  { keyPath: "id", autoIncrement:true });
        var periodStore = db.createObjectStore(TIME_PERIOD_STORE);
        var groupTypeStore = db.createObjectStore(GROUP_TYPE_STORE);
        var roleStore = db.createObjectStore(ROLE_STORE);

        }
    });

    return dbPromise;
}

export default {
    getGroupTypeStore(){
        return GROUP_TYPE_STORE
    },
    getGroupStore(){
        return GROUP_STORE
    },
    getTempGroupStore(){
        return TEMP_GROUP_STORE
    },
    getUserStore(){
        return USER_STORE
    },
    getTempUserStore(){
        return TEMP_USER_STORE
    },
    getInteractionStore(){
        return INTERACTION_STORE
    },
    getTempInteractionStore(){
        return TEMP_INTERACTION_STORE
    },
    getNoteStore(){
        return NOTE_STORE
    },
    getTempNoteStore(){
        return TEMP_NOTE_STORE
    },
    getPeriodStore(){
        return TIME_PERIOD_STORE
    },
    getRoleStore(){
        return ROLE_STORE;
    },

    async saveObject(storeName, obj, key){ 
        let db;
        init()
        .then((returnVal) => {
            db = returnVal;
            //console.log(db);
            return db;
        })
        .then((newDb) => {
            //console.log(newDb);
            let tempRet = newDb.transaction(storeName, 'readwrite').objectStore(storeName).put(obj, key);
            return tempRet.complete;
        })
        .catch((error) => {
            //console.log('idb save object error', error);
            return error;
        });
    },

    async saveTempObject(storeName, obj){ 
        var db = await init();
        const t = db.transaction(storeName, 'readwrite');
        t.objectStore(storeName).add(obj);
        return t.complete;
    },
    

    async getObjectById(storeName, key){
        var db = await init();
        return db.transaction(storeName).objectStore(storeName).get(parseInt(key));
        // .then(ret =>{
        //     return ret ? ret : Promise.reject("Object not found in the IDB");
        // });
    },
    async getAllObjects(storeName){
        // let db;
        // init()
        // .then((returnVal) => {
        //     db = returnVal;
        //     console.log(db);
        //     return db;
        // })
        // .then((newDb) => {
        //     console.log(newDb);
        //     let tempRet = newDb.transaction(storeName).objectStore(storeName).getAll();
        //     return tempRet.complete;
        // })
        // .catch((error) => {
        //     //console.log('idb save object error', error);
        //     return error;
        // });
        var db = await init();
        return db.transaction(storeName).objectStore(storeName).getAll();
        // .then(ret =>{
        //     return ret ? ret : Promise.reject("Object not found in the IDB");
        // });
    },

    async deleteItem(storeName, objKey){
        var db = await init();
        return db.transaction(storeName, 'readwrite').objectStore(storeName).delete(objKey);
    },

    async deleteTempItem(storeName, obj){
        var db = await init();
        return db.transaction(storeName, 'readwrite').objectStore(storeName).delete(obj);
    }

}
