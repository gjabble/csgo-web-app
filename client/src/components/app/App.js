import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import LoginView from '../../views/login/LoginView';
import RegisterView from '../../views/register/RegisterView';
import ProfileView from '../../views/profile/ProfileView';
import HomeView from '../../views/home/HomeView';
import UploadView from '../../views/upload/UploadView';
import ResultsView from '../../views/results/ResultsView';
import PrivateRoute from '../privateroute/PrivateRoute';

import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from "jwt-decode";
import store from '../../redux/store/store';


if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch({
    type: 'LOGIN',
    payload: decoded
  });
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    store.dispatch({
      type: 'LOGIN',
      payload: {}
    });
    window.location.href = "./login";
  }
}


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={HomeView}></Route>
        <Route path='/login' component={LoginView}></Route>
        <Route path='/register' component={RegisterView}></Route>
        <PrivateRoute path='/profile' component={ProfileView}></PrivateRoute>
        <PrivateRoute path='/upload' component={UploadView}></PrivateRoute>
        <PrivateRoute path='/results' component={ResultsView}></PrivateRoute>
      </BrowserRouter>
    )
  }
}

export default App;


