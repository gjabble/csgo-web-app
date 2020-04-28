import ApplicationBar from '../../components/applicationbar/ApplicationBar';
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/footer/footer';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardHomeView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  cont: {
    maxWidth: "400px"
  }
}));

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['Infinite uploads', 'Infinite GB of storage', 'All analyses packages', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
];

export default function HomeView() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <React.Fragment>
      <CssBaseline />
      <ApplicationBar></ApplicationBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          CSGO Analyzer
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Quickly and efficiently upload CSGO replay files in order to see your performance, spot areas for improvement in your play and track your match history!
        </Typography>
        <br></br>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          The service is currently free! but as the service develops, new pricing will be announced
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container className={classes.cont} component="main" align="center">
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <Card align="center">
            <CardHeader
              title={tier.title}
              subheader={tier.subheader}
              titleTypographyProps={{ align: 'center' }}
              subheaderTypographyProps={{ align: 'center' }}
              action={tier.title === 'Pro' ? <StarIcon /> : null}
              className={classes.cardHeader}
            />
            <CardContent>
              <div className={classes.cardHomeView}>
                <Typography component="h2" variant="h3" color="textPrimary">
                  £{tier.price}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  /mo
                    </Typography>
              </div>
              <ul>
                {tier.description.map((line) => (
                  <Typography component="li" variant="subtitle1" align="center" key={line}>
                    {line}
                  </Typography>
                ))}
              </ul>
            </CardContent>
            <CardActions>
              <Button fullWidth variant={tier.buttonVariant} color="primary" onClick={(e) => history.push('/register')}>
                {tier.buttonText}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Container>
      {/* Footer */}
      <Footer></Footer>
      {/* End footer */}
    </React.Fragment>
  );
}