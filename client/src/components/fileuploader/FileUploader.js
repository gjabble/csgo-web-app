import axios from 'axios';
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  fileUpload: {
    padding: theme.spacing(3),
  },
  input: {
    display: 'none'
  },
  uploadFileButton: {
    display: 'none',
  },
  spinner: {
    display: 'none',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -12,
  },
}));

const FileUpload = ({ dispatch }) => {
  const classes = useStyles();
  let history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  const handleFileUpload = (e) => {
    e.preventDefault();
    document.querySelector('#errormsg').style.display = 'none';
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
    let formData = new FormData();
    formData.append('file', document.querySelector('#fileupload').files[0]);
    const decoded = jwt_decode(localStorage.getItem('jwtToken'));
    formData.append('userid', decoded.id);
    formData.append('playerName', decoded.ign);
    axios.post('/api/users/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      setSuccess(true);
      setLoading(false);
      dispatch({
        type: 'UPLOAD',
        payload: response.data,
      });
      history.push('/results');
    }).catch((err) => {
      setSuccess(false);
      setLoading(false);
      if (err.response.status === 400) {
        if (err.response.data.playernotfound) {
          document.querySelector('#errormsg').style.display = 'inline';
        }
      }
    });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Upload Your Replay
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Upload your CSGO replay file to be processed<br></br>Your file must be a .dem file
        </Typography>
        <form onSubmit={handleFileUpload}>
          <Grid align='center' className={classes.fileUpload}>
            <input
              disabled={loading}
              onChange={function (e) {
                if (e.target.files[0]) {
                  document.querySelector('#errormsg').style.display = 'none';
                  document.querySelector('#filename').innerText = 'Chosen Replay: ' + e.target.files[0].name;
                  document.querySelector('#uploadfilebutton').style.display = 'inline';
                }
              }}
              accept='.dem'
              className={classes.input}
              id="fileupload"
              type="file"
            />
            <label htmlFor="fileupload">
              <Button disabled={loading} id="choosereplay" variant="outlined" color="primary" component="span">
                Choose Replay
              </Button>
            </label>
            <br></br>
            <br></br>
            <Typography id='filename' align="center" color="textSecondary" component="p"></Typography>
            <br></br>

            <Button
              style={{ display: 'none' }}
              id="uploadfilebutton"
              variant="outlined"
              color="primary"
              className={buttonClassname}
              disabled={loading}
              type="submit"
            >
              Upload
                </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Grid>
        </form>
        <Container align="center">
          <Typography style={{ display: 'none', color: 'red' }} id="errormsg">No player with the IGN associated with your account was found in the uploaded replay. <br></br>Please update your profile or upload another replay.</Typography>
        </Container>
      </Container>
    </React.Fragment>
  );
}

export default connect()(FileUpload);