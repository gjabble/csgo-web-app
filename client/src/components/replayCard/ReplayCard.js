import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    height: 150
  }
});

const ReplayCard = (props) => {
  const classes = useStyles();
  const data = props.data;
  const history = useHistory();
  const dispatch = useDispatch();
  let result = props.data.winner ? 'Victory' : 'Defeat';
  if (data.tScore == data.ctScore) {
    result = 'Draw';
  }

  const handleClick = (e) => {
    const replayid = e.currentTarget.getAttribute('replayid');
    axios.get("/api/users/replay", {
      params: {
        replayid: replayid
      }
    })
      .then(result => {
        dispatch({
          type: 'UPLOAD',
          payload: result.data,
        });
        history.push('/results');
      })
      .catch(e => console.log(e))
  }

  const getTime = (unix_timestamp) => {
    var date = new Date(unix_timestamp);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
  }

  return (
    <Card variant="outlined">
      <CardContent className={classes.content}>
        <Container align="center">
          <Typography>Counter Terrorist</Typography>
          <Typography>{data.ctScore}</Typography>
        </Container>
        <Container align="center">
          <Typography variant="h5">{result}</Typography>
          <Typography>{getTime(data.datetime)}</Typography>
          <Typography>{data.ctScore}:{data.tScore}</Typography>
          <Typography>{data.map}</Typography>
          <Typography>{data.gameLength}</Typography>
          <Button variant="outlined" replayid={data.id} color="primary" onClick={handleClick}>View Analysis</Button>
        </Container>
        <Container align="center">
          <Typography>Terrorist</Typography>
          <Typography>{data.tScore}</Typography>
        </Container>
      </CardContent>
    </Card>
  );
}

export default ReplayCard;