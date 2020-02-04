import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = {
  container: {
    padding: '20px',
  }
};

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test user',
      uploadedReplays: [{
        map: 'Dust 2',
        result: 'Win',
        uploadTime: Date.now(),
      }]
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" component="main" className={this.props.classes.container}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary">
            [User's] Profile
        </Typography>
          <div>
            {JSON.stringify(this.state)}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ProfileComponent);