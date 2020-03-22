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
    justifyContent: 'center'
  }
}));

const PerformanceChart = (props) => {
  const data = [
    {
      stat: 'Average Kills',
      A: Number(props.data.averageKills),
    },
    {
      stat: 'Average Assists',
      A: Number(props.data.averageAssists),
    },
    {
      stat: 'Average Deaths',
      A: Number(props.data.averageDeaths),
    },
    {
      stat: 'Average Headshots',
      A: Number(props.data.averageHeadshot),
    },
  ];
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="stat" />
        <PolarRadiusAxis />
        <Radar name="" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </Container>
  );
}

export default PerformanceChart;