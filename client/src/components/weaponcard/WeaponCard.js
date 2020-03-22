import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import deagle from '../../icons/deagle.png';
import Container from '@material-ui/core/Container';
import * as name from '../../icons/index.js';

console.log(name);

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    maxHeight: 500,
  },
  columns: {
    columnCount: 2,
    columnGap: 40
  }
});

const getImageIcon = (weapon) => {
  for (const icon of Object.keys(name)) {
    if (icon.includes(weapon)) {
      return name[icon];
    }
  }
}

const WeaponChart = (props) => {
  console.log(props.data);
  const classes = useStyles();
  const imageIcon = getImageIcon(props.data.weapon);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Container className={classes.mediaContainer}>
          <img src={imageIcon}></img>
        </Container>
        <Typography variant="h5" component="h3">
          {props.data.weapon.toUpperCase()}
        </Typography>
        <CardContent>
          <table>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Kills</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{props.data.kills}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Headshots</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{props.data.headshots}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Damage Inflicted</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{props.data.damage}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Shots Fired</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{props.data.numberFired}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Shots Hit</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{props.data.numberHit}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Accuracy</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{props.data.accuracy ? `${props.data.accuracy.toFixed(2)}%` : '0.00%'}</Typography>
              </td>
            </tr>
          </table>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default WeaponChart;