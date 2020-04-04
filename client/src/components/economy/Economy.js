import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
}));

const Economy = (props) => {
  const classes = useStyles();
  console.log(props.data);
  return (
    <Container>
      {/**
       * graph showing money spent, saved, earned each round y axis is usd, x axis is round - state.rounds
       * per weapon: money spent, times bought - ?
       * force buy, eco, full buy per round - state.rounds
       * stats for average spend per round, average save per round - state.rounds
       */}
    </Container>
  );
}

function mapStateToProps(state) {
  if (state) {
    return {
      data: state
    }
  }
  return {};
}

export default connect(mapStateToProps)(Economy);