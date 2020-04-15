import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReplayCard from '../replayCard/ReplayCard';

import Button from '@material-ui/core/Button';

const styles = {
  container: {
    paddingTop: '64px'
  },
  card: {
    minWidth: 500
  },
  content: {
    display: 'flex',
    height: 150
  }
};

class ProfileComponent extends React.Component {
  constructor() {
    super();
  }

  // componentDidMount() {
  //   axios.get("/api/users/uploads")
  //     .then(result => console.log(result))
  //     .catch(e => console.log(e))
  // }

  render() {
    const { classes } = this.props;
    const user = this.props.auth.user;
    return (
      <Container className={classes.container}>
        <Card className={classes.card}>
          <Typography align="center" variant="h2">Your Profile</Typography>
          <CardContent>
            <Typography variant="h4">Personal Information</Typography>
            <br></br>
            <Typography variant="h5" align="left" color="textSecondary" component="p">
              First Name
            </Typography>
            <Typography variant="h5" align="left" component="p">
              {user.firstname}
            </Typography>
            <br></br>
            <Typography variant="h5" align="left" color="textSecondary" component="p">
              Last Name
            </Typography>
            <Typography variant="h5" align="left" component="p">
              {user.lastname}
            </Typography>
            <br></br>
            <Typography variant="h5" align="left" color="textSecondary" component="p">
              In Game Name
            </Typography>
            <Typography variant="h5" align="left" component="p">
              {user.ign}
            </Typography>
            <br></br>
            <Typography variant="h4">Replay History</Typography>
            <br></br>
            <ReplayCard></ReplayCard>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(withStyles(styles)(ProfileComponent)));
