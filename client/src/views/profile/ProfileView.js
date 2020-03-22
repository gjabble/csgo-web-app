import React from 'react';
import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import ProfileComponent from '../../components/profilecomponent/ProfileComponent';


class ProfileView extends React.Component {
  render() {
    return (
      <div>
        <ApplicationBar></ApplicationBar>
        <ProfileComponent></ProfileComponent>
      </div>
    )
  }
}

export default ProfileView;