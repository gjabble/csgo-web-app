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
import showResults from '../../redux/actions';

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
  }
}));

const FileUpload = ({ dispatch }) => {
  const classes = useStyles();
  let history = useHistory();
  const handleFileUpload = (e) => {
    e.preventDefault();
    document.querySelector('#spinner').style.display = 'block';
    let formData = new FormData();
    formData.append('file', document.querySelector('#fileupload').files[0]);
    axios.post('file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      document.querySelector('#spinner').style.display = 'none';
      dispatch(showResults(response.data));
      console.log(response.data);
      history.push('/results');
    }).catch((err) => {
      console.log(err);
      document.querySelector('#spinner').style.display = 'none';
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
              onChange={function (e) {
                document.querySelector('#filename').innerText = 'Chosen Replay: ' + e.target.files[0].name;
                document.querySelector('#uploadFileButton').style.display = 'inline';
              }}
              accept='.dem'
              className={classes.input}
              id="fileupload"
              type="file"
            />
            <label htmlFor="fileupload">
              <Button variant="contained" color="primary" component="span">
                Choose Replay
              </Button>
            </label>
            <br></br>
            <br></br>
            <Typography id='filename' align="center" color="textSecondary" component="p"></Typography>
            <br></br>
            <CircularProgress id='spinner' className={classes.spinner}></CircularProgress>
            <Button id="uploadFileButton" className={classes.uploadFileButton} variant="contained" color="primary" type='submit'>
              Upload
            </Button>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}

export default connect()(FileUpload);