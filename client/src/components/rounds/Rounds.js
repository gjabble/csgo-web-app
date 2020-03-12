import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import RoundPanel from '../roundPanel/RoundPanel';


const useStyles = makeStyles({
});

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
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  let rounds = props.data;
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
    <Container>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        cenetered>
        {rounds ? (rounds.map(round => (
          <Tab label={`Round ${round.roundNumber}`}>
          </Tab>
        ))) : (<div></div>)}
      </Tabs>
      {rounds ? (rounds.map(round => (
        <TabPanel value={value} index={round.roundNumber - 1}>
          <RoundPanel data={round}></RoundPanel>
        </TabPanel>
      ))) : (<div></div>)}
    </Container>)
}

function mapStateToProps(state) {
  if (state.rounds) {
    return {
      data: state.rounds
    }
  }
  return {};
}

export default connect(mapStateToProps)(Rounds);