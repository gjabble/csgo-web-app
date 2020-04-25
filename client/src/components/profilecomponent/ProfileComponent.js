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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = (theme) => ({
  container: {
    paddingTop: '64px'
  },
  card: {
    minWidth: 500
  },
  content: {
    display: 'flex',
    height: 150
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  editform: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%'
  },
  buttons: {
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

});

class ProfileComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      replays: [],
      disabled: true,
      editdisabled: false,
      errors: {
        firstname: {
          error: false,
          message: ''
        },
        lastname: {
          error: false,
          message: ''
        },
        email: {
          error: false,
          message: ''
        },
        ign: {
          error: false,
          message: ''
        }
      }
    }
  }

  componentDidMount() {
    axios.get("/api/users/uploads")
      .then(result => {
        const res = result.data.sort((a, b) => b.datetime - a.datetime);
        this.setState({ replays: res, disabled: true });
      })
      .catch(e => console.log(e))
  }

  handlesubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(document.querySelector('#editform'));
    axios.post('/api/users/edit', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      document.querySelector('#relogmsg').style.display = 'inline';
      this.setState({
        disabled: true,
        editdisabled: true,
        errors: {
          firstname: {
            error: false,
            message: ''
          },
          lastname: {
            error: false,
            message: ''
          },
          email: {
            error: false,
            message: ''
          },
          ign: {
            error: false,
            message: ''
          }
        }
      });

    }).catch((error) => {
      if (error.response.status === 400) {
        this.setState({
          errors: {
            firstname: {
              error: error.response.data.firstname ? true : false,
              message: error.response.data.firstname ? error.response.data.firstname : '',
            },
            lastname: {
              error: error.response.data.lastname ? true : false,
              message: error.response.data.lastname ? error.response.data.lastname : '',
            },
            email: {
              error: error.response.data.email ? true : false,
              message: error.response.data.email ? error.response.data.email : '',
            },
            ign: {
              error: error.response.data.ign ? true : false,
              message: error.response.data.ign ? error.response.data.ign : '',
            },
          }
        })
      }
    });
  }

  render() {
    const { classes } = this.props;
    const user = this.props.auth.user;
    return (
      <Container className={classes.container}>
        <Card className={classes.card} raised>
          <Typography align="center" variant="h2">Your Profile</Typography>
          <CardContent>
            <ExpansionPanel square>
              <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Personal Information</Typography>
                <Typography className={classes.secondaryHeading}>See and edit your personal information</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Container>
                  <form id="editform" className={classes.editform} onSubmit={this.handlesubmit}>
                    <TextField
                      label="First Name"
                      defaultValue={user.firstname}
                      disabled={this.state.disabled}
                      size="medium"
                      name="firstname"
                      error={this.state.errors.firstname.error}
                      helperText={this.state.errors.firstname.message}
                      required
                    />
                    <TextField
                      label="Last Name"
                      defaultValue={user.lastname}
                      disabled={this.state.disabled}
                      size="medium"
                      name="lastname"
                      error={this.state.errors.lastname.error}
                      helperText={this.state.errors.lastname.message}
                      required
                    />
                    <TextField
                      label="Email"
                      defaultValue={user.email}
                      disabled={this.state.disabled}
                      size="medium"
                      name="email"
                      error={this.state.errors.email.error}
                      helperText={this.state.errors.email.message}
                      required
                    />
                    <TextField
                      label="In Game Name"
                      defaultValue={user.ign}
                      helperText={this.state.errors.ign.message}
                      disabled={this.state.disabled}
                      size="medium"
                      name="ign"
                      error={this.state.errors.ign.error}
                      required
                    />
                    <Typography id="relogmsg" style={{ display: 'none' }} color="primary">Please logout for changes to take effect</Typography>
                    <div className={classes.buttons}>
                      <Button align="left" variant="outlined" disabled={this.state.editdisabled} onClick={(e) => {
                        this.setState({ disabled: !this.state.disabled })
                      }}>Edit</Button>
                      <Button type="submit" variant="outlined" disabled={this.state.disabled}>Save</Button>
                    </div>
                  </form>

                </Container>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel square>
              <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Replay History</Typography>
                <Typography className={classes.secondaryHeading}>See your replay history</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Container>
                  {this.state.replays.length > 0 ? (this.state.replays.map(replay => (
                    <ReplayCard data={replay}></ReplayCard>
                  ))) : (
                      <Typography variant="h5" align="left" color="textSecondary" component="p">
                        No replays found,
                    upload a replay <a href="/upload">here</a>
                      </Typography>)}
                </Container>

              </ExpansionPanelDetails>
            </ExpansionPanel>
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
