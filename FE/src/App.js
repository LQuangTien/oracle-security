import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Layout from "./components/Layout";
import AddProfile from "./containers/AddProfile";
import AddUser from "./containers/AddUser";
import EditProfile from "./containers/EditProfile";
// import AddProduct from "./containers/AddProduct";
import EditUser from "./containers/EditUser";
import Profiles from "./containers/Profiles";
import Roles from "./containers/Roles";
import AddRole from "./containers/AddRole";
import Users from "./containers/Users";
import EditRole from "./containers/EditRole";
import Signin from "./containers/Signin";
import { isUserLoggedIn } from "./actions";
import Privilege from "./containers/Privilege";
// import Signup from "./containers/Signup";

function App() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);
  return (
    <div className="App">
      <Layout>
        <Switch>
          <PrivateRoute exact path="/privilege" component={Privilege} />
          <PrivateRoute exact path="/users" component={Users} />
          <PrivateRoute exact path="/user/add" component={AddUser} />
          <PrivateRoute exact path="/user/:username" component={EditUser} />
          <PrivateRoute exact path="/profiles" component={Profiles} />
          <PrivateRoute exact path="/profile/add" component={AddProfile} />
          <PrivateRoute
            exact
            path="/profile/:profileName"
            component={EditProfile}
          />
          <PrivateRoute exact path="/roles" component={Roles} />
          <PrivateRoute exact path="/role/add" component={AddRole} />
          <PrivateRoute exact path="/role/:roleName" component={EditRole} />

          {/* <Route path="/signup" component={Signup} /> */}
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
