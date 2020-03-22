import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import LoginView from '../../views/login/LoginView';
import RegisterView from '../../views/register/RegisterView';
import ProfileView from '../../views/profile/ProfileView';
import HomeView from '../../views/home/HomeView';
import UploadView from '../../views/upload/UploadView';
import ResultsView from '../../views/results/ResultsView';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={HomeView}></Route>
        <Route path='/login' component={LoginView}></Route>
        <Route path='/register' component={RegisterView}></Route>
        <Route path='/profile' component={ProfileView}></Route>
        <Route path='/upload' component={UploadView}></Route>
        <Route path='/results' component={ResultsView}></Route>
      </BrowserRouter>
    )
  }
}

export default App;


