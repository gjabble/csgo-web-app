import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import RoundPanel from '../roundPanel/RoundPanel';
import OverviewRoundPanel from '../overviewRoundPanel/OverviewRoundPanel';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const Rounds = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  let rounds = props.data.rounds;
  rounds = rounds.sort((a, b) => {
    if (a.roundNumber < b.roundNumber) {
      return -1;
    } else if (a.roundNumber > b.roundNumber) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <Container className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        cenetered>
        <Tab label='Overview'></Tab>
        {rounds ? (rounds.map(round => (
          <Tab label={`Round ${round.roundNumber}`}></Tab>
        ))) : (<div></div>)}
      </Tabs>
      <TabPanel value={value} index={0}>
        <OverviewRoundPanel data={props.data}></OverviewRoundPanel>
      </TabPanel>
      {rounds ? (rounds.map(round => (
        <TabPanel value={value} index={round.roundNumber}>
          <RoundPanel data={round}></RoundPanel>
        </TabPanel>
      ))) : (<div></div>)}
    </Container>)
}

function mapStateToProps(state) {
  if (state.results.rounds && state.results.weapons && state.results.performance) {
    return {
      data: {
        rounds: state.results.rounds,
        weapons: state.results.weapons,
        performance: state.results.performance
      }
    }
  }
  return {};
}

export default connect(mapStateToProps)(Rounds);