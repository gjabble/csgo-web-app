import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ReferenceLine
} from 'recharts';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
}));

const MoneyChart = (props) => {
  const classes = useStyles();
  const data = [];
  for (const round of props.data) {
    data.push({
      name: round.roundNumber.toString(),
      'Money Saved': round.moneySaved,
      'Money Spent': round.amountSpent,
      'Kill Reward': round.killReward
    });
  }

  return (
    <Container>
      <Container className={classes.container}>
        <LineChart
          width={1000}
          height={400}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" label={{ value: 'Round Number', angle: 0, position: 'bottom' }}></XAxis>
          <YAxis label={{ value: 'Dollars', angle: -90, position: 'insideLeft' }}></YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="Money Spent" stroke="red" activeDot={{ r: 8 }} />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="Money Saved" stroke="blue" />
          <Line type="monotone" dataKey="Kill Reward" stroke="green" />
        </LineChart>
      </Container>
    </Container>


  );
}

export default MoneyChart;


