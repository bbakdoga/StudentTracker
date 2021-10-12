const { mockRequest, mockResponse, mockNext } = require('../testUtil/testUtil');
const GetUserGroups = require('../../controller/GetUserGroups');
const GetUser = require('../../controller/GetUser');
const PostUserGroup = require('../../controller/PostUserGroup');
const GetUserGroup = require('../../controller/GetUserGroup');
const UpdateUserGroup = require('../../controller/UpdateUserGroup');
const DeleteUserGroup = require('../../controller/DeleteUserGroup');
const mockData = require('../testUtil/groupsBackend');
const util = require('util');

let userId;

let req;
let res;
let next;

let insertedGroupIds = [];

beforeAll( async (done) => { 
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    await GetUser(req, res, next);
    userId = (res.json)[0].usr_id;
    done();
});

afterAll( async (done) => { 
    for (let i = 0; i < insertedGroupIds.length; i++) {
        //console.log(insertedGroupIds[i]);
        req = mockRequest();
        req.params.authUserId = userId;
        req.params.groupId = insertedGroupIds[i];
        res = mockResponse();
        next = mockNext();
        await DeleteUserGroup(req, res, next);
        //console.log(res.json);
    }
    done();
});

describe('database testing retireving multiple groups', ()=>{
  //jest.setTimeout(30000);
  test('Inserting valid corner test groups', async (done) => {
        for (var group of mockData.PostValidGroups) {
            //console.log(group.grp_name);  
            req = mockRequest();
            req.params.authUserId = userId;
            req.body = group;

            res = mockResponse();
            next = mockNext();

            await PostUserGroup(req, res, next);
            group = res.json;

            //console.log(util.inspect(group, {showHidden: false, depth: null}));
            expect(next).not.toHaveReturned();

            expect(group.length).toEqual(1);//Have atleast 1 dataset
            expect(group).not.toBeNull();
            expect(group).toBeDefined();

            group = group[0];

            //Find a way to get number
            expect(group).toHaveProperty('grp_id');
            expect(typeof group.grp_id).toBe('number');

            insertedGroupIds.push(group.grp_id);

            expect(group).toHaveProperty('grp_name');
            expect(typeof group.grp_name).toBe('string');

            expect(group).toHaveProperty('grp_section');
            if (typeof group.grp_section === 'object') {
                expect(group.grp_section).toBeNull();
            }else {
                expect(typeof group.grp_section).toBe('number');
            }
            
            expect(group).toHaveProperty('grp_usr_id');
            expect(typeof group.grp_usr_id).toBe('number');

            expect(group).toHaveProperty('grp_gtp_name');
            expect(typeof group.grp_gtp_name).toBe('string');

            expect(group).toHaveProperty('start_year');
            expect(new Number(group.start_year) instanceof Number).toBeTruthy();

            expect(group).toHaveProperty('start_period');
            expect(typeof group.start_period).toBe('string');

            expect(group).toHaveProperty('end_year');
            if (typeof group.end_year === 'object') {
                expect(group.end_year).toBeNull();
            } else {
                expect(new Number(group.end_year) instanceof Number).toBeTruthy();
            }

            expect(group).toHaveProperty('end_period');
            if (typeof group.end_period === 'object') {
                expect(group.end_period).toBeNull();
            } else {
                expect(typeof group.end_period).toBe('string');
            }
        }

        done();
    });

    //Initializes group
    test('Getting Multiple groups for previously inserted data', async (done) => {
        //console.log(insertedGroupIds);
        req = mockRequest();
        req.params.authUserId = userId;
        res = mockResponse();
        next = mockNext();
        await GetUserGroups(req, res, next);
        let groups = res.json;

        expect(groups.length).toBeGreaterThanOrEqual(6);//Have atleast 1 dataset
        expect(groups).not.toBeNull();
        // console.log(groups); 

        for (var group of groups) {
            // console.log(groups);  
            expect(group).toHaveProperty('grp_id');
            expect(typeof group.grp_id).toBe('number');

            expect(group).toHaveProperty('grp_usr_id');
            expect(typeof group.grp_usr_id).toBe('number');
            expect(group.grp_usr_id).toBe(userId);

            expect(group).toHaveProperty('grp_name');
            expect(typeof group.grp_name).toBe('string');

            expect(group).toHaveProperty('grp_section');
            if (typeof group.grp_section === 'object') {
                expect(group.grp_section).toBeNull();
            }else {
                expect(typeof group.grp_section).toBe('number');
            }

            expect(group).toHaveProperty('grp_gtp_name');
            expect(typeof group.grp_gtp_name).toBe('string');

            expect(group).toHaveProperty('grp_start_prd_id');
            expect(typeof group.grp_start_prd_id).toBe('number');

            expect(group).toHaveProperty('start_year');
            expect(new Number(group.start_year) instanceof Number).toBeTruthy();

            expect(group).toHaveProperty('start_period');
            expect(typeof group.start_period).toBe('string');

            expect(group).toHaveProperty('grp_end_prd_id');
            if (typeof group.grp_end_prd_id === 'object') {
                expect(group.grp_end_prd_id).toBeNull();
            } else {
                expect(typeof group.grp_end_prd_id).toBe('number');
            }
          
            expect(group).toHaveProperty('end_year');
            if (typeof group.end_year === 'object') {
                expect(group.end_year).toBeNull();
            } else {
                expect(new Number(group.end_year) instanceof Number).toBeTruthy();
            }

            expect(group).toHaveProperty('end_period');
            if (typeof group.end_period === 'object') {
                expect(group.end_period).toBeNull();
            } else {
                expect(typeof group.end_period).toBe('string');
            }

            if (group.grp_section == insertedGroupIds[2]) {
                expect(group.grp_section).toBeNull();
            }else if (group.grp_id == insertedGroupIds[3]) {
                expect(group.grp_name).toBe('Mustafa_Test_No_End_Period');
                expect(group.start_year.toString()).toBe('2018');
                expect(group.end_year.toString()).toBe('2019');
                expect(group.grp_gtp_name).toContain('Research');
                expect(group.grp_section).toBe(1);
                expect(group.end_period).toBeNull();
                expect(group.grp_end_prd_id).toBeNull();
            }else if (group.grp_id == insertedGroupIds[4]) {
                expect(group.end_year).toBeNull();
            }else if (group.grp_id == insertedGroupIds[5]) {
                expect(group.grp_name).toBe('1234');
            }
        }
        done();
    });

    test('Updating valid corner test groups', async (done) => {

        let ValidGroupLengths = mockData.PostValidGroups.length;
        //console.log(ValidGroupLengths);
        for (let i = 0; i < insertedGroupIds.length; i++) {
            //console.log("iteration ", i);
            req = mockRequest();
            req.params.authUserId = userId;
            req.params.groupId = insertedGroupIds[i];
            req.body = mockData.PostValidGroups[ValidGroupLengths - i - 1];
            res = mockResponse();
            next = mockNext();
            await UpdateUserGroup(req, res, next);

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
            expect(updatedGroup.grp_id).toEqual(req.params.groupId);

            expect(updatedGroup).toHaveProperty('grp_name');
            expect(typeof updatedGroup.grp_name).toBe('string');

            expect(updatedGroup).toHaveProperty('grp_section');
            if (typeof updatedGroup.grp_section === 'object') {
                expect(updatedGroup.grp_section).toBeNull();
            }else {
                expect(typeof updatedGroup.grp_section).toBe('number');
            }
            
            expect(updatedGroup).toHaveProperty('grp_usr_id');
            expect(typeof updatedGroup.grp_usr_id).toBe('number');

            expect(updatedGroup).toHaveProperty('grp_gtp_name');
            expect(typeof updatedGroup.grp_gtp_name).toBe('string');

            expect(updatedGroup).toHaveProperty('start_year');
            expect(new Number(updatedGroup.start_year) instanceof Number).toBeTruthy();

            expect(updatedGroup).toHaveProperty('start_period');
            expect(typeof updatedGroup.start_period).toBe('string');

            expect(updatedGroup).toHaveProperty('end_year');
            if (typeof updatedGroup.end_year === 'object') {
                expect(updatedGroup.end_year).toBeNull();
            } else {
                expect(new Number(updatedGroup.end_year) instanceof Number).toBeTruthy();
            }

            expect(updatedGroup).toHaveProperty('end_period');
            if (typeof updatedGroup.end_period === 'object') {
                expect(updatedGroup.end_period).toBeNull();
            } else {
                expect(typeof updatedGroup.end_period).toBe('string');
            }
        }
        done();
    });
});
