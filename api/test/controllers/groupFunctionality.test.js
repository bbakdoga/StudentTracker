const { mockRequest, mockResponse, mockNext } = require('../testUtil/testUtil');
const GetUser = require('../../controller/GetUser');
const PostUserGroup = require('../../controller/PostUserGroup');
const GetUserGroup = require('../../controller/GetUserGroup');
const UpdateUserGroup = require('../../controller/UpdateUserGroup');
const DeleteUserGroup = require('../../controller/DeleteUserGroup');
const mockData = require('../testUtil/groupsBackend');
const util = require('util');

let group;
let userId;
let req;
let res;
let next;

beforeAll( async (done) => { 
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    await GetUser(req, res, next);
    userId = (res.json)[0].usr_id;
    // console.log(mockData.PostValidGroups);
    // console.log(mockData.PostValidGroups[0]);
    //userId = userId[0].userId; 
    done();
});

//var ifGroupInserted = (condition) => condition ? test : test.skip;

describe('Performing CRUD operation for a single group', ()=>{

    //Initializes group
    test('Inserting group for authenticated user in Database', async (done) => {

        req = mockRequest();
        req.params.authUserId = userId;
        req.body = mockData.PostValidGroups[0];

        res = mockResponse();
        next = mockNext();

        await PostUserGroup(req, res, next);
        group = res.json;

        //console.log(util.inspect(group, {showHidden: false, depth: null}));

        expect(group.length).toEqual(1);//Have atleast 1 dataset
        expect(group).not.toBeNull();
        expect(group).toBeDefined();

        expect(next).not.toHaveReturned();

        group = group[0];
        //console.log(groupInserted);

        //Find a way to get number
        expect(group).toHaveProperty('grp_id');
        expect(typeof group.grp_id).toBe('number');

        expect(group).toHaveProperty('grp_name');
        expect(typeof group.grp_name).toBe('string');
        expect(group.grp_name).toBe('Mustafa_Test_Group');

        expect(group).toHaveProperty('grp_section');
        expect(typeof group.grp_section).toBe('number');
        expect(group.grp_section).toBe(1);

        expect(group).toHaveProperty('grp_usr_id');
        expect(typeof group.grp_usr_id).toBe('number');
        expect(group.grp_usr_id).toBe(6);

        expect(group).toHaveProperty('grp_gtp_name');
        expect(typeof group.grp_gtp_name).toBe('string');
        expect(group.grp_gtp_name).toBe('Class');

        expect(group).toHaveProperty('start_year');
        expect(new Number(group.start_year) instanceof Number).toBeTruthy();
        expect(group.start_year).toBe(2020);

        expect(group).toHaveProperty('start_period');
        expect(typeof group.start_period).toBe('string');
        expect(group.start_period).toBe("Spring");

        expect(group).toHaveProperty('end_year');
        expect(new Number(group.end_year) instanceof Number).toBeTruthy();
        expect(group.end_year).toBe(2020);

        expect(group).toHaveProperty('end_period');
        expect(typeof group.end_period).toBe('string');
        expect(group.end_period).toBe("Spring");

        done();
    });


    test('Retrieving group for authenticated user in db', async (done) => {
        // Your test
        req = mockRequest();
        req.params.authUserId = userId;
        req.params.groupId = group.grp_id;

        res = mockResponse();
        next = mockNext();

        await GetUserGroup(req, res, next);
        let retrievedGroup = res.json;

        expect(next).not.toHaveReturned();

        expect(retrievedGroup.length).toEqual(1);//Have atleast 1 dataset
        expect(retrievedGroup).not.toBeNull();
        expect(retrievedGroup).toBeDefined();

        retrievedGroup = retrievedGroup[0];
        expect(retrievedGroup).toEqual(group);
        expect(retrievedGroup).toStrictEqual(group);

        done();

    });

    //Initializes group
    test('Updating group for authenticated user in Database', async (done) => {

        // console.log(userId);
        // console.log(group.grp_id);

        req = mockRequest();
        req.params.authUserId = userId;
        req.params.groupId = group.grp_id;
        req.body = mockData.PostValidGroups[1];

        res = mockResponse();
        next = mockNext();

        await UpdateUserGroup(req, res, next);
        //console.log(util.inspect("Response check" + res.json, {showHidden: true, depth: null}));
        let updatedGroup = res.json;

        //console.log(util.inspect(group, {showHidden: false, depth: null}));
        expect(next).not.toHaveReturned();

        expect(updatedGroup.length).toEqual(1);//Have atleast 1 dataset
        expect(updatedGroup).not.toBeNull();
        expect(updatedGroup).toBeDefined();

        updatedGroup = updatedGroup[0];

        //Find a way to get number
        expect(updatedGroup).toHaveProperty('grp_id');
        expect(typeof updatedGroup.grp_id).toBe('number');
        expect(updatedGroup.grp_id).toBe(group.grp_id);

        expect(updatedGroup).toHaveProperty('grp_name');
        expect(typeof updatedGroup.grp_name).toBe('string');
        expect(updatedGroup.grp_name).toBe('Mustafa_Test_Group_Updated');

        expect(updatedGroup).toHaveProperty('grp_section');
        expect(typeof updatedGroup.grp_section).toBe('number');
        expect(updatedGroup.grp_section).toBe(2);

        expect(updatedGroup).toHaveProperty('grp_usr_id');
        expect(typeof updatedGroup.grp_usr_id).toBe('number');
        expect(updatedGroup.grp_usr_id).toBe(6);

        expect(updatedGroup).toHaveProperty('grp_gtp_name');
        expect(typeof updatedGroup.grp_gtp_name).toBe('string');
        expect(updatedGroup.grp_gtp_name).toBe('Club');

        expect(updatedGroup).toHaveProperty('start_year');
        expect(new Number(updatedGroup.start_year) instanceof Number).toBeTruthy();
        expect(updatedGroup.start_year).toBe(2021);

        expect(updatedGroup).toHaveProperty('start_period');
        expect(typeof updatedGroup.start_period).toBe('string');
        expect(updatedGroup.start_period).toBe("Summer");

        expect(updatedGroup).toHaveProperty('end_year');
        expect(new Number(updatedGroup.end_year) instanceof Number).toBeTruthy();
        expect(updatedGroup.end_year).toBe(2021);

        expect(updatedGroup).toHaveProperty('end_period');
        expect(typeof updatedGroup.end_period).toBe('string');
        expect(updatedGroup.end_period).toBe("Summer");

        group = updatedGroup;

        done();
    });

    test('Deleting group for authenticated user in db', async (done) => {
        req = mockRequest();
        req.params.authUserId = userId;
        req.params.groupId = group.grp_id;

        res = mockResponse();
        next = mockNext();

        //console.log('group Id ', group.grp_id);

        await DeleteUserGroup(req, res, next);

        expect(next).not.toHaveReturned();

        let deletedGroup = res.json;
        
        expect(deletedGroup).toHaveProperty('affectedRows');
        expect(typeof deletedGroup.affectedRows).toBe('number');
        expect(deletedGroup.affectedRows).toEqual(1);
        //console.log(util.inspect( deletedGroup, {showHidden: false, depth: null}));

        req = mockRequest();
        req.params.authUserId = userId;
        req.params.groupId = group.grp_id;

        res = mockResponse();
        next = mockNext();

        //Check retireving group with the ID return null
        await GetUserGroup(req, res, next);
        let retrievedGroup = res.json;
        expect(retrievedGroup).toHaveLength(0);
        //console.log(util.inspect( retrievedGroup, {showHidden: false, depth: null}));

        done();
    });

});