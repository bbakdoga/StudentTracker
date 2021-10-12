import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import AddGroup from "./components/AddGroup/AddGroup";
import ViewStudent from "./components/ViewStudent/ViewStudent";
import NotFound from "./components/NotFound/NotFound";
import ViewGroup from "./components/ViewGroup/ViewGroup";
import ReactLoading from "react-loading";
import { makeStyles } from "@material-ui/core/styles";

import {
  StudentTrackerProvider,
  userContext,
} from "./util/StudentTrackerContext";
import EditGroup from "./components/EditGroup/EditGroup";

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: "25%",
    margin: "auto",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <StudentTrackerProvider>
      <userContext.Consumer>
        {({ authUser, error }) => {
          // Add in handling for loading versus Error
          if (!authUser) {
            if (error) return <h1>{error}</h1>;
            return (
              <ReactLoading
                className={classes.loading}
                type={"bars"}
                color={"grey"}
              />
            );
          }
          return (
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/add-group" component={AddGroup} />
                <Route path="/users/:userId" component={ViewStudent} />
                <Route path="/groups/:groupId" component={ViewGroup} />
                <Route path="/edit-group/:groupId" component={EditGroup} />
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          );
        }}
      </userContext.Consumer>
    </StudentTrackerProvider>
  );
}

export default App;
