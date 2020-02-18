import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// dummy data
let rows = JSON.parse('{"scoreBoard":{"players":[{"name":"iPlayToLose","kills":6,"assists":5,"deaths":17,"team":"ct"},{"name":"Subzero8","kills":8,"assists":1,"deaths":15,"team":"ct"},{"name":"Fuji","kills":15,"assists":0,"deaths":17,"team":"ct"},{"name":"Byakuya","kills":8,"assists":2,"deaths":15,"team":"ct"},{"name":"}?One shot = ONe kill ? {","kills":6,"assists":2,"deaths":15,"team":"ct"},{"name":"♔ kuZi ♔","kills":13,"assists":1,"deaths":12,"team":"t"},{"name":"Laika_Boss","kills":13,"assists":2,"deaths":5,"team":"t"},{"name":"Kahve * -* ","kills":11,"assists":4,"deaths":11,"team":"t"},{"name":"✪EKMEK ARASI TOST✪","kills":21,"assists":1,"deaths":7,"team":"t"},{"name":"Саша лох","kills":19,"assists":4,"deaths":8,"team":"t"},{"name":"Elliot","kills":0,"assists":1,"deaths":2,"team":"ct"}]}}');
rows = rows.scoreBoard.players.filter((row) => row.team === 't');

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">kills</TableCell>
            <TableCell align="right">assists</TableCell>
            <TableCell align="right">deaths</TableCell>
            <TableCell align="right">team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.kills}</TableCell>
              <TableCell align="right">{row.assists}</TableCell>
              <TableCell align="right">{row.deaths}</TableCell>
              <TableCell align="right">{row.team}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
