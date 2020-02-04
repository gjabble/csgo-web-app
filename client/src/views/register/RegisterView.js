import React from 'react';
import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import RegisterComponent from '../../components/registercomponent/RegisterComponent';

class RegisterView extends React.Component {
  render() {
    return (
      <div>
        <ApplicationBar></ApplicationBar>
        <RegisterComponent></RegisterComponent>
      </div>
    )
  }
}

export default RegisterView;