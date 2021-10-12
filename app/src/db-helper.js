import IDBClient from './db-client.js';


export default {
    
    getGroups(){
        return IDBClient.getAllObjects(IDBClient.getGroupStore());
    },
    getTempGroups(){
        return IDBClient.getAllObjects(IDBClient.getTempGroupStore());
    },
    getGroupsById(id){
        return IDBClient.getObjectById(IDBClient.getGroupStore(),id);
    },
    saveGroups(group){
        return IDBClient.saveObject(IDBClient.getGroupStore(),group, group.grp_id);
    },
    saveTempGroup(group){
        return IDBClient.saveTempObject(IDBClient.getTempGroupStore(),group);
    },
    deleteGroups(group){
        return IDBClient.deleteItem(IDBClient.getGroupStore(),group.grp_id);
    },
    deleteTempGroups(group){
        return IDBClient.deleteItem(IDBClient.getTempGroupStore(),group.id);
    },
 


    getInteractions(){
        return IDBClient.getAllObjects(IDBClient.getInteractionStore());
    },
    getTempInteractions(){
        return IDBClient.getAllObjects(IDBClient.getTempInteractionStore());
    },
    getInteractionsById(id){
        return IDBClient.getObjectById(IDBClient.getInteractionStore(),id);
    },
    saveInteractions(interaction){
        return IDBClient.saveObject(IDBClient.getInteractionStore(), interaction, interaction.int_id);
    },
    saveTempInteractions(interaction){
        return IDBClient.saveObject(IDBClient.getTempInteractionStore(), interaction);
    },
    deleteInteraction(interaction){
        return IDBClient.deleteItem(IDBClient.getInteractionStore(),interaction.int_id);
    },
    deleteTempInteractions(interaction){
        return IDBClient.deleteItem(IDBClient.getTempInteractionStore(),interaction.id);
    },


    getUsers(){
        return IDBClient.getAllObjects(IDBClient.getUserStore());
    },
    getUsersById(id){
        return IDBClient.getObjectById(IDBClient.getUserStore(),id);
    },
    saveUsers(user){
        IDBClient.saveObject(IDBClient.getUserStore(),user[0], user[0].usr_id)
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch((error) => {
            return error;
        })
    },
    


    getNotes(){
        return IDBClient.getAllObjects(IDBClient.getNoteStore());
    },
    getTempNotes(){
        return IDBClient.getAllObjects(IDBClient.getTempNoteStore());
    },
    getNotesById(id){
        return IDBClient.getObjectById(IDBClient.getNoteStore(),id);
    },
    saveNotes(note){
        return IDBClient.saveObject(IDBClient.getNoteStore(), note, note.not_id);
    },
    saveTempNotes(note){
        return IDBClient.saveTempObject(IDBClient.getTempNoteStore(), note);
    },
    deleteNote(noteId){
        return IDBClient.deleteItem(IDBClient.getNoteStore(),noteId);
    },
    deleteTempNote(note){
        return IDBClient.deleteItem(IDBClient.getTempNoteStore(),note.id);
    },

    getPeriods(){
        return IDBClient.getAllObjects(IDBClient.getPeriodStore());
    },
    savePeriods(period){
        return IDBClient.saveObject(IDBClient.getPeriodStore(), period, period.prd_id);
    },

    saveGroupType(type){
        return IDBClient.saveObject(IDBClient.getGroupTypeStore(), type, type.grp_id);
    },
    getGroupType(){
        return IDBClient.getAllObjects(IDBClient.getGroupTypeStore());
    },

    saveInteractionRole(role){
        return IDBClient.saveObject(IDBClient.getRoleStore(), role, role.irl_id);
    },
    getInteractionRole(){
        return IDBClient.getAllObjects(IDBClient.getRoleStore());
    }

    
}
