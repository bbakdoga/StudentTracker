var { mockRequest, mockResponse, mockNext } = require('../testUtil/testUtil');
var PostUserInteractions = require('../../controller/PostUserInteractions');
var util = require('util');

describe('Insert a mock group in the db, with authenticated users ID', ()=>{

    //Creating a temporary object for adding/deleting data
    var InteractionInformationJSON =  {
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
    };
    var req = mockRequest(6, null, null, InteractionInformationJSON);
    var res = mockResponse();
    var next = mockNext();

    //Initializes group
    test('Getting groups initially from db', async (done) => {

        await PostUserInteractions(req, res, next);
        var interactions = res.json;

        // console.log(util.inspect(group, {showHidden: false, depth: null}));
        // expect(interactions.length).toEqual(1);//Have atleast 1 dataset
        // expect(interactions).not.toBeNull();

        // interactions = interactions[0];

        // //Find a way to get number
        // expect(interactions).toHaveProperty('grp_id');
        // expect(typeof interactions.grp_id).toBe('number');
        // expect(interactions.grp_id).toBe(2);

        // expect(interactions).toHaveProperty('int_id');
        // expect(typeof interactions.int_id).toBe('number');

        // expect(interactions).toHaveProperty('usr_id');
        // expect(typeof interactions.usr_id).toBe('number');

        // expect(interactions).toHaveProperty('int_irl_id');
        // expect(typeof interactions.int_irl_id).toBe('number');
        // expect(interactions.int_irl_id).toBe(1);

        // expect(interactions).toHaveProperty('start_year');
        // expect(new Number(interactions.start_year) instanceof Number).toBeTruthy();

        // expect(interactions).toHaveProperty('start_period');
        // expect(typeof interactions.start_period).toBe('string');

        done();
    });
});
