import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import * as name from '../../icons/index.js';
import nuke from '../../icons/nuke.png';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    height: 150
  }
});

const getImageIcon = (weapon) => {
  for (const icon of Object.keys(name)) {
    if (icon.includes(weapon)) {
      return name[icon];
    }
  }
}

const ReplayCard = (props) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent className={classes.content}>
        <img src={nuke}></img>
        <Container align="center">
          <Typography>Counter Terrorist</Typography>
          <Typography>15</Typography>
        </Container>
        <Container align="center">
          <Typography variant="h5">Victory/Loss</Typography>
          <Typography>15:16</Typography>
          <Typography>Map Name</Typography>
          <Typography>53:14</Typography>
          <Typography>Replay ID</Typography>
          <Button color="primary">View Analysis</Button>
        </Container>
        <Container align="center">
          <Typography>Counter Terrorist</Typography>
          <Typography>15</Typography>
        </Container>
      </CardContent>
    </Card>
  );
}

export default ReplayCard;