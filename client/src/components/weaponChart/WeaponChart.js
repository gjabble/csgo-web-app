import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WeaponCard from '../weaponcard/WeaponCard';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({}));

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

const WeaponChart = (props) => {
  let weapons = [];
  let i = 0;
  Object.entries(props.data).forEach(weaponData => {
    let weaponStats = weaponData[1];
    weaponStats.weapon = weaponData[0];
    weaponStats.index = i;
    weapons.push(weaponStats);
    i++;
  });
  weapons.sort((a, b) => b.kills - a.kills);
  console.log(weapons);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Container className={classes.root}>
      {/* <Typography>Weapon Overview - accordion for rifles, pistols, grenades - sliding view like tabs</Typography> */}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        cenetered>
        {weapons ? (weapons.map(weapon => (
          <Tab label={<WeaponCard data={weapon}></WeaponCard>}></Tab>
        ))) : (<div></div>)}
      </Tabs>
      {/* {weapons ? (weapons.map(weapon => (
        <TabPanel value={value} index={weapon.index}>
          {JSON.stringify(weapon)}
        </TabPanel>
      ))) : (<div></div>)} */}
    </Container>)
}


export default WeaponChart;