import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import ViewStudent from '../../src/components/ViewStudent/ViewStudent';
import {StudentTrackerProvider,userContext} from "../../src/util/StudentTrackerContext";
import { act } from "react-dom/test-utils";
import {  Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import '@testing-library/jest-dom/extend-expect';

// const groups = require("../util/groups");
// const groupInteractions = require("../util/UserGroupInteractions");

const user = require("../util/UserUser");
const userInteractions = require("../util/UserUserInteractions");
const route = "/users/1";
const path = "/users/:userId";
const history = createMemoryHistory({ initialEntries: [route] });

import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

let userAuth = [
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

beforeEach( async (done) => {
    fetch.mockClear();
    fetch
    .once(JSON.stringify(userAuth))
    .once(JSON.stringify(userInteractions))
    .once(JSON.stringify(user))
    // .once(JSON.stringify(userInteractions))
    // .once(JSON.stringify(user));

    console.log(userInteractions);
    console.log(user);

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
            <Route path={path} component={ViewStudent} />
        </Router >
        );
      }}
    </userContext.Consumer>
      </StudentTrackerProvider>);
    });
    console.log(fetch.mock.calls);
    done();
});

afterEach(cleanup);

describe('<View Student Page components />', () => {
  test('Rendering the Student View page', async (done) => {
    expect(fetch.mock.calls.length).toBe(3);
    expect(fetch.mock.calls[0][0]).toBe('http://localhost/api/user');
    expect(fetch.mock.calls[1][0]).toBe('http://localhost/api/users/6/users/1/interactions');
    expect(fetch.mock.calls[2][0]).toBe('http://localhost/api/users/6/users/1');
    // expect(screen.getByText('Group')).toBeInTheDocument();
    // expect(screen.getByText(/Group/)).toBeInTheDocument();
    // expect(screen.getByText('Search:')).toBeInTheDocument();
    // expect(screen.getByRole('table')).toBeInTheDocument();
    // var home = screen.getByTestId('Home');
    // expect(home).toBeInTheDocument();
    done();
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