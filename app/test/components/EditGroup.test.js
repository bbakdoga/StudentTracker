import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import EditGroup from '../../src/components/EditGroup/EditGroup';
import {StudentTrackerProvider,userContext} from "../../src/util/StudentTrackerContext";
import { act } from "react-dom/test-utils";
import {  Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import '@testing-library/jest-dom/extend-expect';

const groups = require("../util/groups");
const group_types = require("../util/grouptypes");
const periods = require("../util/periods");
const int_roles = require("../util/interaction_roles");
const groupInteractions = require("../util/UserGroupInteractions");
const route = "/groups/1";
const path = "/groups/:groupId";
const history = createMemoryHistory({ initialEntries: [route] });

let user = [
  {
      "usr_id": 6,
      "usr_unity_id": "ixdoming",
      "usr_email": "ixdoming@ncsu.edu",
      "usr_first_name": "Ignacio",
      "usr_preferred_name": "Ignacio",
      "usr_last_name": "Dominguez",
      "usr_preferred_pronouns": "Mr"
  }
];

import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
beforeEach(async (done) => {
    fetch.mockClear();
    fetch
    .once(JSON.stringify(user))
    .once(JSON.stringify(group_types))
    .once(JSON.stringify(periods))
    .once(JSON.stringify(int_roles))
    .once( JSON.stringify([groups[0]]) )
    .once( JSON.stringify(groupInteractions.interaction1) );
    //console.log([groups[0]] );

await act( async () => {
  render(
    <StudentTrackerProvider>
      <userContext.Consumer>
    {({ authUser, error }) => {
      // Add in handling for loading versus Error
      if (!authUser) {
        if (error) return <h1>{error}</h1>;
        return (
          <div />
        );
      }
      return (
        <Router history={history}>
            <Route path={path} component={EditGroup} />
      </Router >
      
      );
    }}
  </userContext.Consumer>
    </StudentTrackerProvider>);
    });
    done();
    console.log(fetch.mock.calls);

});

afterEach(() => cleanup());


describe('<View Group Page components />', () => {
    

    test('Rendering the edit group page', async (done) => {
       
        //screen.debug();
        console.log(fetch.mock.calls);

        expect(fetch.mock.calls.length).toBe(6);
        expect(fetch.mock.calls[0][0]).toBe('http://localhost/api/user');
        expect(fetch.mock.calls[1][0]).toBe('http://localhost/api/group-types');
        expect(fetch.mock.calls[2][0]).toBe('http://localhost/api/periods');
        expect(fetch.mock.calls[3][0]).toBe('http://localhost/api/interaction-roles');
        expect(fetch.mock.calls[4][0]).toBe('http://localhost/api/users/6/groups/1');
        expect(fetch.mock.calls[5][0]).toBe('http://localhost/api/users/6/groups/1/interactions');

        expect(screen.getByText('Edit Group')).toBeInTheDocument();
        expect(screen.getByText('Edit Group Interactions')).toBeInTheDocument();
        expect(screen.getByText('Kevin')).toBeInTheDocument();

        screen.debug();

        done();
    });
});