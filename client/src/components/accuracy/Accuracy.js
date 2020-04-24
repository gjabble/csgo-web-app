import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccuracyCard from '../accuracyCard/accuracyCard';

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


const Accuracy = (props) => {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classes = useStyles();
  const data1 = props.data;
  const removekeys = [];
  Object.keys(data1).forEach(key => {
    let element = data1[key];
    let totalHits = 0;
    totalHits += element.head;
    totalHits += element.chest;
    totalHits += element.stomach;
    totalHits += element.leftarm;
    totalHits += element.rightarm;
    totalHits += element.leftleg;
    totalHits += element.rightleg;
    element.totalHits = totalHits;
    if (element.totalHits === 0) {
      removekeys.push(key);
    }
  });
  removekeys.forEach(key => {
    delete data1[key];
  });
  const data = Object.entries(data1).sort((a, b) => b[1].totalHits - a[1].totalHits);
  return (
    <div>
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Weapon Accuracy</Typography>
          <Typography className={classes.secondaryHeading}>Find out your individual weapon accuracy breakdown</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Container>
            {data ? (data.map(accdata => (
              <AccuracyCard data={{ weapon: accdata[0], ...accdata[1] }}></AccuracyCard>
            ))) : (<div></div>)}
          </Container>

        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

function mapStateToProps(state) {
  if (state) {
    return {
      data: state.results.accuracy
    }
  }
  return {};
}

export default connect(mapStateToProps)(Accuracy);