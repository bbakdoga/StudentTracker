const { mockRequest, mockResponse, mockNext } = require('../testUtil/testUtil');
const GetUserUser = require('../../controller/GetUserUser');
const GetUser = require('../../controller/GetUser');
const util = require('util');

let userId;

let req;
let res;
let next;

beforeAll( async (done) => { 
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    await GetUser(req, res, next);
    userId = (res.json)[0].userId;
    //userId = userId[0].userId; 
    done();
});

describe('Get users from db with the correct parameter for user', ()=>{
    //Initializes group
    test('users from db with valid parameter (Get 1st student from database)', async (done) => {

        //Get 1st student from db
        req = mockRequest();
        req.params.authUserId = userId;
        req.params.userId = 1;
        res = mockResponse();
        next = mockNext();
        //console.log(req);
        await GetUserUser(req, res, next);
        let user = res.json;
        console.log(util.inspect(user, {showHidden: true, depth: null}));
        expect(user).not.toBeNull();
        expect(user.length).toEqual(1);//Have atleast 1 dataset
        
        user = user[0];

        expect(user).toHaveProperty('usr_id');
        expect(typeof user.usr_id).toBe('number');
        expect(user.usr_id).toBe(1);

        expect(user).toHaveProperty('usr_unity_id');
        expect(typeof user.usr_unity_id).toBe('string');
        expect(user.usr_unity_id).toBe('kshah');

        expect(user).toHaveProperty('usr_email');
        expect(typeof user.usr_email).toBe('string');
        expect(user.usr_email).toBe('kshah7@ncsu.edu');

        expect(user).toHaveProperty('usr_first_name');
        expect(typeof user.usr_first_name).toBe('string');
        expect(user.usr_first_name).toBe('Kevin');

        expect(user).toHaveProperty('usr_preferred_name');
        expect(typeof user.usr_preferred_name).toBe('string');
        expect(user.usr_preferred_name).toBe('Kevin');

        expect(user).toHaveProperty('usr_last_name');
        expect(typeof user.usr_last_name).toBe('string');
        expect(user.usr_last_name).toBe('Shah');

        expect(user).toHaveProperty('usr_preferred_pronouns');
        expect(typeof user.usr_preferred_pronouns).toBe('string');
        expect(user.usr_preferred_pronouns).toBe('Mr');

        done();
    });
});