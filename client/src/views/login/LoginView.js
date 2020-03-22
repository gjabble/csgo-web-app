import React from 'react';
import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import LoginComponent from '../../components/logincomponent/LoginComponent';

class LoginView extends React.Component {
  render() {
    return (
      <div>
        <ApplicationBar></ApplicationBar>
        <LoginComponent></LoginComponent>
      </div>
    )
  }
}

export default LoginView;