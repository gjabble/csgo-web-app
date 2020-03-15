import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  topContainer: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(2),
      width: theme.spacing(24),
      height: theme.spacing(10),
    },
  },
}));

const OverviewRoundPanel = (props) => {
  console.log(props.data);
  return (
    <Container>
      {/**
     * Radar chart
     * Weapon Chart
     * Damage Chart
     * 
     * 
     */}

    </Container>
  )
}

export default OverviewRoundPanel;