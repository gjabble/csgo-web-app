import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import WeaponChart from '../weaponChart/WeaponChart';
import RoundResultChart from '../roundResultChart/RoundResultChart';
import PerformanceChart from '../performanceChart/PerformanceChart';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const OverviewRoundPanel = (props) => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const classes = useStyles();

  return (
    <Container>

      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Round Win/Loss Summary</Typography>
          <Typography className={classes.secondaryHeading}>Find out your team's round wins and losses this game</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RoundResultChart data={props.data.rounds}></RoundResultChart>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Weapon Performance</Typography>
          <Typography className={classes.secondaryHeading}>Find out your performance on weapons used this game</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <WeaponChart data={props.data.weapons}></WeaponChart>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Key Performance Indicators</Typography>
          <Typography className={classes.secondaryHeading}>Find out your average kills, assists, deaths and headshots</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <PerformanceChart data={props.data.performance}></PerformanceChart>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </Container>
  )
}

export default OverviewRoundPanel;