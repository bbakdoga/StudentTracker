 
import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import ViewGroup from '../../src/components/ViewGroup/ViewGroup';
import {StudentTrackerProvider,userContext} from "../../src/util/StudentTrackerContext";
import { act } from "react-dom/test-utils";
import {  Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import '@testing-library/jest-dom/extend-expect';


const groups = require("../util/groups");
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
            <Route path={path} component={ViewGroup} />
      </Router >
      
      );
    }}
  </userContext.Consumer>
    </StudentTrackerProvider>);
    });
    done();
});

afterEach(() => cleanup());

describe('<View Group Page components />', () => {
    

    test('Rendering the view group page', async (done) => {
       
        //screen.debug();
        console.log(fetch.mock.calls);

        expect(fetch.mock.calls.length).toBe(3);
        expect(fetch.mock.calls[0][0]).toBe('http://localhost/api/user');
        expect(fetch.mock.calls[1][0]).toBe('http://localhost/api/users/6/groups/1');
        expect(fetch.mock.calls[2][0]).toBe('http://localhost/api/users/6/groups/1/interactions');
        expect(screen.getByText('Student Name')).toBeInTheDocument();

        done();
    });

    test('Testing Navigation bar', async (done) => {
        //screen.debug();
 
        expect(fetch.mock.calls.length).toBe(3);
        expect(screen.getByText('Student Tracker')).toBeInTheDocument();
        
        done();

    });
    test('Group Title ', async (done) => {
      // screen.debug();
       expect(fetch.mock.calls.length).toBe(3);
       expect(document.title).toBeInTheDocument
       done();

    });
    test('Testing Table', async (done) => {
    // screen.debug();
     expect(fetch.mock.calls.length).toBe(3);
     expect(screen.getByText('Student Name')).toBeInTheDocument();
     expect(screen.getByText('Email')).toBeInTheDocument();
     expect(screen.getByText('Unity ID')).toBeInTheDocument();
     expect(screen.getByText('Role')).toBeInTheDocument();
     expect(screen.getByText('Time Period')).toBeInTheDocument();
     expect(screen.getByText('Notes')).toBeInTheDocument();
     expect(screen.getByText('Total Interactions')).toBeInTheDocument();

     done();

    });
});
