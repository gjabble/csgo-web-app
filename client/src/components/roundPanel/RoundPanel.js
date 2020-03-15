import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

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

const RoundPanel = (props) => {
  const classes = useStyles();
  let result = props.data.winner ? 'Victory' : 'Defeat';
  let timeAlive = props.data.timeAlive == 0 ? 'Entire Round' : `${props.data.timeAlive}s`;
  return (
    <Container>
      <Container className={classes.topContainer}>
        <Paper elevation={3} >
          <Typography>{result}</Typography>
          <Typography>Reason: {props.data.reason}</Typography>
          <Typography>Time Alive: {timeAlive}</Typography>
        </Paper>
      </Container >
      <TableContainer >
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="center">Impact</TableCell>
              <TableCell align="center">{(props.data.damage / props.data.equipmentValue).toFixed(4)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">Kills</TableCell>
              <TableCell align="center">{props.data.kills}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Assists</TableCell>
              <TableCell align="center">{props.data.assists}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">Headshot Kills</TableCell>
              <TableCell align="center">{props.data.headshotKills}</TableCell></TableRow>
            <TableRow>
              <TableCell align="center">Damage Inflicted</TableCell>
              <TableCell align="center">{props.data.damage}</TableCell></TableRow>
            <TableRow>
              <TableCell align="center">Amount Spent</TableCell>
              <TableCell align="center">${props.data.amountSpent}</TableCell></TableRow>
            <TableRow>
              <TableCell align="center">Equipment Value</TableCell>
              <TableCell align="center">${props.data.equipmentValue}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Money Saved</TableCell>
              <TableCell align="center">${props.data.moneySaved}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>

  )
}


export default RoundPanel;