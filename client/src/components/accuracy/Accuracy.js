import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
}));

const Accuracy = (props) => {
  const classes = useStyles();
  return (
    <Container>
      {/**
       * accuracy stats for all weapons used by user
       * pie chart showing hit group distribution
       * overall hit group distribution
       * total number fired
       * total number hit
       */}
    </Container>
  );
}

export default Accuracy;