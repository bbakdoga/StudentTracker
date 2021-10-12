const { mockRequest, mockResponse, mockNext } = require('../testUtil/testUtil');
const GetUser = require('../../controller/GetUser');
const RoutesAuthentication = require('../../util/RoutesAuthentication');
const UsersAuthentication = require('../../util/UsersAuthentication');
const util = require('util');

let req;
let res;
let next;
let user;

beforeAll( async (done) => { 
    req = mockRequest();
    res = mockResponse();
    next = mockNext();
    await GetUser(req, res, next);
    user = (res.json)[0];
    //userId = userId[0].userId; 
    done();
});

describe ('Routes authentication test suite', ()=>{ 
    test('Valid routes authenitcation', async (done) => {
        req = mockRequest();
        req.params.authUserId = user.usr_id;
        res = mockResponse();
        next = mockNext();
        await RoutesAuthentication(req, res, next);
        expect(next).toHaveReturned();
        expect(next.value).toBeUndefined();
        done();
    });

});

describe ('User authentication test suite', ()=>{ 
    test('Valid routes authenitcation', async (done) => {
        req = mockRequest();
        req.params.authUserId = user.usr_id;
        res = mockResponse();
        next = mockNext();
        await UsersAuthentication(req, res, next);
        expect(next).toHaveReturned();
        expect(next.value).toBeUndefined();
        done();
    });
});