import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { connect } from "react-redux";
import setAuthToken from '../../utils/setAuthToken';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  }
});

class ButtonAppBar extends React.Component {
  constructor() {
    super();
  }

  logout = (e) => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    this.props.dispatch({
      type: 'LOGIN',
      payload: {}
    });
    this.props.history.push('/login');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} color='inherit' component={Link} to='/'>CSGO Analyzer</Typography>

            {this.props.auth.isAuthenticated
              ? <Button color="inherit" className={classes.menuButton} component={Link} to='/results'>Results</Button>
              : <div></div>
            }
            {this.props.auth.isAuthenticated
              ? <Button color="inherit" className={classes.menuButton} component={Link} to='/upload'>
                <Icon className={classes.menuButton} color='inherit'>add_circle</Icon>
                <span>Upload</span>
              </Button>
              : <div></div>
            }

            {this.props.auth.isAuthenticated
              ? <Button color="inherit" className={classes.menuButton} component={Link} to='/profile'>Profile</Button>
              : <div></div>
            }

            {this.props.auth.isAuthenticated
              ? <Button color="inherit" className={classes.menuButton} onClick={this.logout}>Logout</Button>
              : <Button color="inherit" className={classes.menuButton} component={Link} to='/login'>Login</Button>
            }

            {!this.props.auth.isAuthenticated
              ? <Button color="inherit" className={classes.menuButton} component={Link} to='/register'>Register</Button>
              : <div></div>
            }

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(ButtonAppBar)));