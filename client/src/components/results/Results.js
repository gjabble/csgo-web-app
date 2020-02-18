import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Scoreboard from '../scoreboard/Scoreboard'


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

export default function Results() {
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
            <Paper elevation={3}>16</Paper>
            <Paper elevation={3}>Dust 2 iPlayToLose Win 45:33</Paper>
            <Paper elevation={3}>3</Paper>
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
            <TabPanel value={value} index={1}>rounds</TabPanel>
            <TabPanel value={value} index={2}>economy</TabPanel>
            <TabPanel value={value} index={3}>accuracy</TabPanel>
          </Container>
        </Container>
      </Paper>
    </Container>
  )
}