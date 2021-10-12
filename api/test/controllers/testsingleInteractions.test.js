var { mockRequest, mockResponse, mockNext } = require('../testUtil/testUtil');
var PostUserInteractions = require('../../controller/PostUserInteractions');
var GetUserUserInteractions = require('../../controller/GetUserUserInteractions');
var UpdateUserInteractions = require('../../controller/UpdateUserInteraction');
var DeleteUserInteraction = require('../../controller/DeleteUserInteraction');
var util = require('util');



var interaction;
var userInserted = false;

var req;
var res;
var next;

var global_usrid;
var global_int_id;

const InteractionInformationJSON =  [
    {
        usr_unity_id: "test10",
        usr_email: "test10@ncsu.edu",
        usr_first_name: "Tester",
        usr_last_name: "Sayeed",
        grp_id: 2,
        int_irl_id: 1,
        int_start_prd_id: 1,
        start_year: 2020,
        int_end_prd_id: 1,
        end_year: 2020
    }
];

var updatedInteractionInformation =  {
    usr_unity_id: "test10",
    usr_email: "test10@ncsu.edu",
    usr_first_name: "Tester2",
    usr_last_name: "Sayeed2",
    usr_id: null,
    int_irl_id: 1,
    int_start_prd_id: 1,
    start_year: 2020,
    int_end_prd_id: 1,
    end_year: 2020
     
};
var updatedInteractionInformation2 =  {
    int_id: 43,
        grp_id: 2,
        usr_id: 12,
        grp_name: 'CSC 433 : Privacy',
        usr_first_name: 'test',
        usr_last_name: 'Sayeed',
        usr_email: 'test10@ncsu.edu',
        usr_unity_id: 'test10',
        int_irl_id: 1,
        irl_name: 'Professor',
        not_title: null,
        not_text: null,
        int_start_prd_id: 1,
        start_period: 'Spring',
        start_year: 2020,
        int_end_prd_id: 1,
        end_period: 'Spring',
        end_year: 2020

}


describe('Performing CRUD operation for a single interaction', ()=>{
    test('inserting single user interaction in Database', async (done) => {
        req = mockRequest();
        req.params.authUserId = 6;
        req.body = InteractionInformationJSON;
        res = mockResponse();
        next = mockNext();

        await PostUserInteractions(req, res, next);
        interaction= res.json;
        global_usrid = interaction[0].usr_id;
        console.log("user id ", global_usrid);
        global_int_id = interaction[0].int_id;

        expect(next.value).toBeUndefined();

        //console.log(interaction);
        expect(interaction.length).toEqual(1);
        //console.log("update1");
        console.log(interaction[0]);
        done();

    });
    test('getting single user interaction in Database', async (done) => {
        req = mockRequest();
        req.params.authUserId = 6;
        req.params.userId = 2;

        res = mockResponse();
        next = mockNext();

        await GetUserUserInteractions(req, res, next);

        var retrievedInteraction = res.json;
        retrievedInteraction = retrievedInteraction[0]

        //console.log(retrievedInteraction);
        //console.log("pronouns");

        expect(retrievedInteraction.usr_first_name).toBe('Baris');
        expect(retrievedInteraction.usr_last_name).toBe('Akdogan');
        expect(retrievedInteraction.usr_email).toBe('bbakdoga@ncsu.edu');
        expect(retrievedInteraction.usr_unity_id).toBe('bbakdoga');
        expect(retrievedInteraction.irl_name).toBe('Student');

        done();

    });
    test('updating single user interaction in Database', async (done) => {

        updatedInteractionInformation.usr_id = global_usrid;    
        req = mockRequest();
        req.params.authUserId = 6;
        req.params.groupId = 2;
        req.params.interactionId = global_int_id; 
        req.body = updatedInteractionInformation;

        res = mockResponse();
        next = mockNext();

        await UpdateUserInteractions(req, res, next);
        var respon= res.json;
        expect(next.value).toBeUndefined();

        expect(respon.length).toEqual(1);

        console.log("update");

        console.log(respon[0]);
        //expect(respon.length).toEqual(1);
        done();

    });

    test('deleting single user interaction in Database', async (done) => {
        req = mockRequest();
        res = mockResponse();
        next = mockNext();

        req.params.authUserId = 6;
        req.params.interactionId = global_int_id; 
        await DeleteUserInteraction(req, res, next);

        expect(next).not.toHaveReturned();

        let deletedInteraction = res.json;

        expect(deletedInteraction).toHaveProperty('affectedRows');
        expect(typeof deletedInteraction.affectedRows).toBe('number');
        expect(deletedInteraction.affectedRows).toEqual(1);
        

        req = mockRequest();
        req.params.authUserId = 6;
        req.params.userId = global_usrid;

        res = mockResponse();
        next = mockNext();

        //Check retireving group with the ID return null
        await GetUserUserInteractions(req, res, next);
        let retrievedInteraction = res.json;
        expect(retrievedInteraction).toHaveLength(0);

        done();


    });

});
