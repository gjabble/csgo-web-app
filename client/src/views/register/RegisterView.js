import React from 'react';
import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import RegisterComponent from '../../components/registercomponent/RegisterComponent';
import Footer from '../../components/footer/footer';

class RegisterView extends React.Component {
  render() {
    return (
      <div>
        <ApplicationBar></ApplicationBar>
        <RegisterComponent></RegisterComponent>
        <Footer></Footer>
      </div>
    )
  }
}

export default RegisterView;