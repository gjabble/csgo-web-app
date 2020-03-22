import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import WeaponChart from '../weaponChart/WeaponChart';
import RoundResultChart from '../roundResultChart/RoundResultChart';
import PerformanceChart from '../performanceChart/PerformanceChart';


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
}));

const OverviewRoundPanel = (props) => {
  const classes = useStyles();
  return (
    <Container>
      {/* <Typography>Round win/loss overview</Typography>
      <Typography>Radar chart showing performance in game</Typography> 
      * Radar chart
     * Weapon Chart
     * Damage Chart*/}
      <PerformanceChart data={props.data.performance}></PerformanceChart>
      <RoundResultChart data={props.data.rounds}></RoundResultChart>
      <WeaponChart data={props.data.weapons}></WeaponChart>
    </Container>
  )
}

export default OverviewRoundPanel;