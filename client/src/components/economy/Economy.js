import React from 'react';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import MoneyChart from '../moneychart/MoneyChart';
import RoundTypeChart from '../roundtypechart/RoundTypeChart';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import EconomyPerformanceChart from '../economyPerformanceChart/EconomyPerformanceChart';
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

const Economy = (props) => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classes = useStyles();
  return (
    <Container>
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Economy Graph</Typography>
          <Typography className={classes.secondaryHeading}>Find out your expenditure breakdown this game</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <MoneyChart data={props.data}></MoneyChart>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Round Types</Typography>
          <Typography className={classes.secondaryHeading}>Find out your round buy types this game</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RoundTypeChart data={props.data}></RoundTypeChart>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Average Economy Values</Typography>
          <Typography className={classes.secondaryHeading}>Find out your average money earned, saved, and spent</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <EconomyPerformanceChart data={props.data}></EconomyPerformanceChart>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </Container>
  );
}

function mapStateToProps(state) {
  if (state) {
    return {
      data: state.rounds
    }
  }
  return {};
}

export default connect(mapStateToProps)(Economy);