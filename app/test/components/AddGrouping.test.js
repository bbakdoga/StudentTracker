import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import AddGroup from '../../src/components/AddGroup/AddGroup';
import AddGroupTable from '../../src/components/AddGroup/AddGroupTable';
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
          <Route path={path} component={AddGroup} />
    </Router >
    
    );
  }}
</userContext.Consumer>
  </StudentTrackerProvider>);
  });
  done();

});

describe('<AddGrouping />', () => {
  test('Rendering the edit group page', async (done) => {
     
    
      expect(fetch.mock.calls.length).toBe(3);
      expect(fetch.mock.calls[0][0]).toBe('http://localhost/api/user');
      expect(fetch.mock.calls[1][0]).toBe('http://localhost/api/group-types');
      expect(fetch.mock.calls[2][0]).toBe('http://localhost/api/periods');
      //screen.debug();

      done();
  });
  test('Checking if the elements appear', async (done) => {
      let wrapper;

      expect(screen.getByText('Add Group')).toBeInTheDocument();
      expect(screen.getByText('Name of Group')).toBeInTheDocument();
      expect(screen.getByText('Start Period')).toBeInTheDocument();
      expect(screen.getByText('Start Year')).toBeInTheDocument();
      expect(screen.getByText('End Period')).toBeInTheDocument();
      expect(screen.getByText('End Year')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();



      //expect(wrapper.find('section').at(0).props().placeholder).toEqual('Enter Class Section')

    done();
  });
  test('Checking if the elements appear', async (done) => {
    
    done();
  });


});