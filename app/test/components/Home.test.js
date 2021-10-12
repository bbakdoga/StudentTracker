import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import Home from '../../src/components/Home/Home';
import {StudentTrackerProvider,userContext} from "../../src/util/StudentTrackerContext";
import { act } from "react-dom/test-utils";
import {  Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import '@testing-library/jest-dom/extend-expect';

var groups = require("../util/groups");
var groupInteractions = require("../util/UserGroupInteractions");
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

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

beforeEach( async (done) => {
  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });
  fetch.mockClear();
  fetch
      .once(JSON.stringify(user))
      .once(JSON.stringify(groups))
      .once(JSON.stringify(groupInteractions.interaction1))
      .once(JSON.stringify(groupInteractions.interaction2))
      .once(JSON.stringify(groupInteractions.interaction3))
      .once(JSON.stringify(groupInteractions.interaction4));

    const history = createMemoryHistory();
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
            <Home />
          </Router >
          );
        }}
      </userContext.Consumer>
        </StudentTrackerProvider>);
    });
    done();
});

afterEach(cleanup);

describe('<Home Page components />', () => {
  test('Rendering the home page',  () => {
    //screen.debug();
    console.log("success");
    // expect(fetch.mock.calls.length).toBe(6);
    // expect(fetch.mock.calls[0][0]).toBe('http://localhost/api/user');
    // expect(fetch.mock.calls[1][0]).toBe('http://localhost/api/users/6/groups');
    // expect(screen.getByText('Group')).toBeInTheDocument();
    // expect(screen.getByText(/Group/)).toBeInTheDocument();
    // //expect(screen.getByText('Search:')).toBeInTheDocument();
    // expect(screen.getByRole('table')).toBeInTheDocument();
    // var home = screen.getByTestId('Home');
    // expect(home).toBeInTheDocument();
    cleanup();
  });
  

  // test('Making changes within the app', async () => {
  //   render(<Home />);
  //   fireEvent.change(screen.getByRole('Search'), {
  //     target: { value: 'CSC' },
  //   });
  //   expect(screen.getByText(/CSC/)).toBeInTheDocument();

  // });

  // test('checking table properties', async () => {
  //   render(<Home />);
  //   fireEvent.change(screen.getByRole('Search'), {
  //     target: { value: 'CSC' },
  //   });
  //   expect(screen.getByText(/CSC/)).toBeInTheDocument();

  // });
});

// afterEach(() => {
//   jest.restoreAllMocks();
// });