import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import * as name from '../../icons/index.js';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    height: 150
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '1000px'
  },
  th: {
    padding: '40px',
    paddingBottom: '2px',
    paddingTop: '0px'
  }
});


const getImageIcon = (weapon) => {
  for (const icon of Object.keys(name)) {
    if (icon.includes(weapon)) {
      return name[icon];
    }
  }
}

const AccuracyCard = (props) => {
  console.log(props.data);
  const classes = useStyles();
  const data = props.data;
  const imageIcon = getImageIcon(data.weapon);
  return (
    <Card >
      <CardContent className={classes.card}>
        <Container>
          <Typography variant="h5" component="h3">
            {data.weapon}
          </Typography>
          <img src={imageIcon}></img>
        </Container>
        <Container>
          <table>
            <th className={classes.th}>Body Part</th>
            <th className={classes.th}>Hits</th>
            <th className={classes.th}>Percentage</th>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Head</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{data.head}</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{((data.head / data.totalHits) * 100).toFixed(2)}%</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Chest</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{data.chest}</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{((data.chest / data.totalHits) * 100).toFixed(2)}%</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Stomach</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{data.stomach}</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{((data.stomach / data.totalHits) * 100).toFixed(2)}%</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Left Arm</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{data.leftarm}</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{((data.leftarm / data.totalHits) * 100).toFixed(2)}%</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Right Arm</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{data.rightarm}</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{((data.rightarm / data.totalHits) * 100).toFixed(2)}%</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Left Leg</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{data.leftleg}</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{((data.leftleg / data.totalHits) * 100).toFixed(2)}%</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">Right Leg</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{data.rightleg}</Typography>
              </td>
              <td>
                <Typography variant="body1" color="textSecondary" component="p">{((data.rightleg / data.totalHits) * 100).toFixed(2)}%</Typography>
              </td>
            </tr>
          </table>
        </Container>
      </CardContent>
    </Card>
  );
}

export default AccuracyCard;