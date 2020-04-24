import React from 'react';
import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import ProfileComponent from '../../components/profilecomponent/ProfileComponent';
import Footer from '../../components/footer/footer';


class ProfileView extends React.Component {
  render() {
    return (
      <div>
        <ApplicationBar></ApplicationBar>
        <ProfileComponent></ProfileComponent>
        <Footer></Footer>
      </div>
    )
  }
}

export default ProfileView;