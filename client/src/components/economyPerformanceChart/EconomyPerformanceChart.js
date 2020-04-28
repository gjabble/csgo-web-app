import React from 'react';
import Container from '@material-ui/core/Container';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

const EconomyPerformanceChart = (props) => {
  const averageSpend = props.data.map(r => r.amountSpent).reduce((acc, curr) => acc + curr) / props.data.length;
  const averageSaved = props.data.map(r => r.moneySaved).reduce((acc, curr) => acc + curr) / props.data.length;
  const averageEarned = props.data.map(r => r.killReward).reduce((acc, curr) => acc + curr) / props.data.length;
  const data = [
    {
      stat: 'Average Spend',
      A: averageSpend,
    },
    {
      stat: 'Average Save',
      A: averageSaved,
    },
    {
      stat: 'Average Earned',
      A: averageEarned,
    },
  ];
  const classes = useStyles();
  return (
    <Container>
      <Container className={classes.container}>
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={400} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis />
          <Radar name="" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>

      </Container>
      <Container>
        <Typography>Average Spend: ${averageSpend.toFixed(2)}</Typography>
        <Typography>Average Saved: ${averageSaved.toFixed(2)}</Typography>
        <Typography>Average Earned: ${averageEarned.toFixed(2)}</Typography>
      </Container>
    </Container>
  );
}

export default EconomyPerformanceChart;