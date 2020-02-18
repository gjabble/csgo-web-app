import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from '../scoreboardTable/Table';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
  },
  type: {
    paddingTop: theme.spacing(1),
  },
}));

export default function Scoreboard() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>

      <Typography className={classes.type}>Team 1 Scores</Typography>
      <Table></Table>

      <Typography className={classes.type}>Team 2 Scores</Typography>
      <Table></Table>

    </Container>
  );
}



