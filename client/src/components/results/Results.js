import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Scoreboard from '../scoreboard/Scoreboard';
import { connect } from 'react-redux';
import Rounds from '../rounds/Rounds';
import Economy from '../economy/Economy';
import Accuracy from "../accuracy/Accuracy";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: '20px'
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(12),
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const Results = (props) => {
  let result = '';
  let colour = '';
  if (props.data.winner) {
    result = 'Victory';
    colour = 'green';
  } else if (props.data.tScore === props.data.ctScore) {
    result = 'Draw';
    colour = 'black';
  } else {
    result = 'Defeat';
    colour = 'red';
  }

  let tcolour = '';
  let ctcolour = '';
  if (props.data.tScore > props.data.ctScore) {
    tcolour = 'green';
    ctcolour = 'red';
  } else if (props.data.tScore < props.data.ctScore) {
    tcolour = 'red';
    ctcolour = 'green';
  } else {
    tcolour = 'black';
    ctcolour = 'black';
  }
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container fixed className={classes.root}>
      <Paper elevation={3}>
        <Container>
          <Container className={classes.topContainer}>
            <Paper elevation={3}>
              <Typography color="textSecondary" variant="h5">CT Score</Typography>
              <Typography style={{ color: ctcolour }} variant="h5">{props.data.ctScore}</Typography>
            </Paper>
            <Paper elevation={3}>
              <Typography style={{ color: colour }} variant="h5">{result}</Typography>
              <Typography color="textSecondary" variant="h6">{props.data.map}</Typography>
              <Typography color="textSecondary" variant="h6">{props.data.gameLength}</Typography>
            </Paper>
            <Paper elevation={3}>
              <Typography color="textSecondary" variant="h5">T Score</Typography>
              <Typography style={{ color: tcolour }} variant="h5">{props.data.tScore}</Typography>
            </Paper>
          </Container>

          <Container>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label='Scoreboard'></Tab>
              <Tab label='Rounds'></Tab>
              <Tab label='Economy'></Tab>
              <Tab label='Accuracy'></Tab>
            </Tabs>
            <TabPanel value={value} index={0}>
              <Scoreboard></Scoreboard>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Rounds></Rounds>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Economy></Economy>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Accuracy></Accuracy>
            </TabPanel>
          </Container>
        </Container>
      </Paper>
    </Container>
  )
}

function mapStateToProps(state) {
  if (Object.entries(state).length === 0) {
    return {};
  }
  return {
    data: state.results
  }
}

export default connect(mapStateToProps)(Results);