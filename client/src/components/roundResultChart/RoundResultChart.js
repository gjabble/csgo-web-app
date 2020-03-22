import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ReferenceLine
} from 'recharts';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const RoundResultChart = (props) => {
  const classes = useStyles();
  const data = [];
  let teamScore = 0;
  let opponentScore = 0;
  props.data.forEach(round => {
    if (round.winner) {
      teamScore++;
    } else {
      opponentScore++;
    }
    data.push({
      name: round.roundNumber.toString(),
      teamScore: teamScore,
      opponentScore: opponentScore
    })
  });

  return (
    <Container className={classes.container}>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: 'Round Number', angle: 0, position: 'bottom' }}></XAxis>
        <YAxis label={{ value: 'Score', angle: -90, position: 'insideLeft' }}></YAxis>
        <Tooltip />
        <ReferenceLine y={16} label="Victory" stroke="green" strokeDasharray="3 3" isFront />
        <ReferenceLine y={15} label="Draw" stroke="black" strokeDasharray="3 3" isFront />
        <Line type="monotone" dataKey="teamScore" stroke="blue" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="opponentScore" stroke="red" />
      </LineChart>
    </Container>

  );
}

export default RoundResultChart;