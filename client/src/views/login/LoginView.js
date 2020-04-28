import React from 'react';
import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import LoginComponent from '../../components/logincomponent/LoginComponent';
import Footer from '../../components/footer/footer';

class LoginView extends React.Component {
  render() {
    return (
      <div>
        <ApplicationBar></ApplicationBar>
        <LoginComponent></LoginComponent>
        <Footer></Footer>
      </div>
    )
  }
}

export default LoginView;