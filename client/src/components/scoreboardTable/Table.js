import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ResultsTable = (props) => {
  let rows;
  if (props.data) {
    rows = props.data.filter((row) => row.team === props.team);
    rows = rows.sort((a, b) => {
      if (a.kills < b.kills) {
        return 1;
      } else if (a.kills > b.kills) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell style={{ width: '100px' }} align="right">kills</TableCell>
            <TableCell align="right">assists</TableCell>
            <TableCell align="right">deaths</TableCell>
            <TableCell align="right">team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows ? (rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.kills}</TableCell>
              <TableCell align="right">{row.assists}</TableCell>
              <TableCell align="right">{row.deaths}</TableCell>
              <TableCell align="right">{row.team}</TableCell>
            </TableRow>
          ))) : (<TableRow></TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function mapStateToProps(state) {
  if (state) {
    return {
      data: state.results.scoreBoard.players
    }
  }
  return {};
}

export default connect(mapStateToProps)(ResultsTable);