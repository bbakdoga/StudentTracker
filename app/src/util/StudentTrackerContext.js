import React, { useState, useEffect } from "react";
import APIClient from "../api/APIClient";

//User Context object for currently logged in user
export const userContext = React.createContext();

export function StudentTrackerProvider(props) {
  const [filter, setFilter] = useState();
  const [authUser, setAuthUser] = useState();
  const [interactionsCount, setInteractionsCount] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    APIClient.getAuthenticatedUser()
      .then((authUser) => {
        setAuthUser(authUser[0]);
        localStorage.setItem('user', JSON.stringify(authUser[0]));
        setError(null);
      })
      .catch((error) => {
        //validate the type of error, if offline , get from local storage and use that
        //console.log(localStorage.getItem('user'));
        let currentUser = JSON.parse(localStorage.getItem('user'));
        setAuthUser(currentUser);

        // setError("Authentication Error");
      });
  }, []);

  return (
    <userContext.Provider
      value={{
        filter: filter,
        setFilter: setFilter,
        authUser: authUser,
        setAuthUser: setAuthUser,
        interactionsCount: interactionsCount,
        setInteractionsCount: setInteractionsCount,
        error: error,
        setError: setError,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
}
