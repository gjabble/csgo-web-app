import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="#">
        CSGO Analyzer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      ign: '',
      password1: '',
      password2: '',
      errors: {
        email: {
          error: false,
          message: ''
        },
        password1: {
          error: false,
          message: ''
        },
        password2: {
          error: false,
          message: ''
        }
      }
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: {
          email: {
            error: nextProps.errors.email ? true : false,
            message: nextProps.errors.email
          },
          password1: {
            error: nextProps.errors.password1 ? true : false,
            message: nextProps.errors.password1
          },
          password2: {
            error: nextProps.errors.password2 ? true : false,
            message: nextProps.errors.password2
          }
        }
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      ign: this.state.ign,
      password1: this.state.password1,
      password2: this.state.password2,
    };
    axios
      .post("/api/users/register", newUser)
      .then(res => this.props.history.push("/login")) // re-direct to login on successful register
      .catch(err =>
        this.props.dispatch({
          type: 'GET_ERRORS',
          payload: err.response.data
        })
      );
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up to CSGO Analyzer
        </Typography>
          <form id="register" className={classes.form} onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={this.onChange}
                  autoComplete="fname"
                  name="firstname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={this.onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="ign"
                  label="In Game Name"
                  name="ign"
                  autoComplete="ign"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={this.state.errors.email.error}
                  helperText={this.state.errors.email.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password1"
                  label="Password"
                  type="password"
                  id="password1"
                  autoComplete="current-password"
                  error={this.state.errors.password1.error}
                  helperText={this.state.errors.password1.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.onChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Re enter password"
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                  error={this.state.errors.password2.error}
                  helperText={this.state.errors.password2.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
            >
              Sign Up
          </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Register)));