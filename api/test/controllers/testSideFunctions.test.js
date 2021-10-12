const { mockRequest, mockResponse, mockNext } = require('../testUtil/testUtil');
const GetUser = require('../../controller/GetUser');
const GetGroupTypes = require('../../controller/GetGroupTypes');
const GetInteractionRoles = require('../../controller/GetInteractionRoles');
const GetPeriods = require('../../controller/GetPeriods');
const GetUserUser = require('../../controller/GetUserUser');
const util = require('util');
let req;
let res;
let next;
let user;

describe ('Getting authenticated user to set id of auth user', ()=>{ 
    test('testing getting auth Id, and see if matches unity id env var', async (done) => {

        req = mockRequest();
        res = mockResponse();
        next = mockNext();
        await GetUser(req, res, next);
        user = res.json;

        expect(user).not.toBeNull();
        expect(user).toBeDefined();

        user = user[0];

        //console.log(util.inspect(userId, {showHidden: true, depth: null}));
        expect(user).toHaveProperty('usr_id');
        expect(new Number(user.userId) instanceof Number).toBeTruthy();
        
        req = mockRequest();
        req.params.authUserId = user.usr_id;
        req.params.userId = user.usr_id;
        res = mockResponse();
        next = mockNext();
        
        await GetUserUser(req, res, next);
        user = res.json;

        //console.log(util.inspect(user, {showHidden: true, depth: null}));
        expect(user).not.toBeNull();
        expect(user).toBeDefined();

        user = user[0];

        expect(user).toHaveProperty("usr_unity_id");
        expect(user.usr_unity_id).toStrictEqual(process.env.AUTHENTICATED_USR);

        done();

    });

});

describe('Test unit for checking side functions\nGrouptypes, timePeriods, interactionRoles ', ()=>{
    test('Periods functionality', async (done) => {
        // Your test
        req = mockRequest();
        res = mockResponse();
        next = mockNext();

        await GetPeriods(req, res, next);

        let periodsArray = res.json;
        expect(periodsArray).not.toBeNull();
        expect(periodsArray).toBeDefined();

        //periodsArray = periodsArray[0];

        expect(periodsArray.length).toEqual(4);
        for (let i = 0; i < periodsArray.length; i++ ) {
            expect(periodsArray[i]).toHaveProperty("prd_id");
            expect(periodsArray[i]).toHaveProperty("prd_name");
            switch(i) {
                case 0:
                    expect(periodsArray[i].prd_id).toEqual(1);
                    expect(periodsArray[i].prd_name).toContain("Spring");
                  // code block
                break;
                case 1:
                    expect(periodsArray[i].prd_id).toEqual(2);
                    expect(periodsArray[i].prd_name).toContain("Summer");
                  // code block
                break;
                case 2:
                    expect(periodsArray[i].prd_id).toEqual(3);
                    expect(periodsArray[i].prd_name).toContain("Fall");
                break;
                  // code block
                case 3:
                    expect(periodsArray[i].prd_id).toEqual(4);
                    expect(periodsArray[i].prd_name).toContain("Winter");
                break;
              }
        }
        done();

    });

    test('Types of groups', async (done) => {
        // Your test
        req = mockRequest();
        res = mockResponse();
        next = mockNext();

        await GetGroupTypes(req, res, next);

        let groupTypes = res.json;
        expect(groupTypes).not.toBeNull();
        expect(groupTypes).toBeDefined();

        //periodsArray = periodsArray[0];

        expect(groupTypes.length).toEqual(4);
        for (let i = 0; i < groupTypes.length; i++ ) {
            expect(groupTypes[i]).toHaveProperty("grp_id");
            expect(groupTypes[i]).toHaveProperty("grp_name");
            switch(i) {
                case 0:
                    expect(groupTypes[i].grp_id).toEqual(1);
                    expect(groupTypes[i].grp_name).toContain("Class");
                  // code block
                break;
                case 1:
                    expect(groupTypes[i].grp_id).toEqual(2);
                    expect(groupTypes[i].grp_name).toContain("Club");
                  // code block
                break;
                case 2:
                    expect(groupTypes[i].grp_id).toEqual(3);
                    expect(groupTypes[i].grp_name).toContain("Other");
                break;
                  // code block
                case 3:
                    expect(groupTypes[i].grp_id).toEqual(4);
                    expect(groupTypes[i].grp_name).toContain("Research");
                break;
              }
        }
        done();

    });

    test('Interaction roles', async (done) => {
        // Your test
        req = mockRequest();
        res = mockResponse();
        next = mockNext();

        await GetInteractionRoles(req, res, next);

        let interactionRoles = res.json;
        expect(interactionRoles).not.toBeNull();
        expect(interactionRoles).toBeDefined();

        //periodsArray = periodsArray[0];

        expect(interactionRoles.length).toEqual(3);
        for (let i = 0; i < interactionRoles.length; i++ ) {
            expect(interactionRoles[i]).toHaveProperty("irl_id");
            expect(interactionRoles[i]).toHaveProperty("irl_name");
            switch(i) {
                case 0:
                    expect(interactionRoles[i].irl_id).toEqual(1);
                    expect(interactionRoles[i].irl_name).toContain("Professor");
                  // code block
                break;
                case 1:
                    expect(interactionRoles[i].irl_id).toEqual(2);
                    expect(interactionRoles[i].irl_name).toContain("Student");
                  // code block
                break;
                case 2:
                    expect(interactionRoles[i].irl_id).toEqual(3);
                    expect(interactionRoles[i].irl_name).toContain("Assistant");
                break;
              }
        }
        done();

    });
});