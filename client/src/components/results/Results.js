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



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
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
  console.log(props.data);
  let result = '';
  if (props.data.winner) {
    result = 'Victory';
  } else {
    result = 'Defeat';
  }
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container className={classes.root}>
      <Paper elevation={3}>
        <Container>
          <Container className={classes.topContainer}>
            <Paper elevation={3}>{props.data.ctScore}</Paper>
            <Paper elevation={3}>
              <Typography>{result}</Typography>
              <Typography>{props.data.playerName}</Typography>
              <Typography>{props.data.map}</Typography>
              <Typography>{props.data.gameLength}</Typography>
            </Paper>
            <Paper elevation={3}>{props.data.tScore}</Paper>
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
              {/* for each round need to show
                  result of round
                  amount spent
                  utility damage
                  purchase summary
                  impact (damage/amount_spent)
                  accuracy */}
            </TabPanel>
            <TabPanel value={value} index={2}>economy</TabPanel>
            <TabPanel value={value} index={3}>accuracy</TabPanel>
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
    data: state
  }
}

export default connect(mapStateToProps)(Results);