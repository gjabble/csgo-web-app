import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color='inherit' component={Link} to='/'>
            CSGO Analyzer
          </Typography>

          <Button color="inherit" className={classes.menuButton} component={Link} to='/results'>Results</Button>

          <Button color="inherit" className={classes.menuButton} component={Link} to='/upload'>
            <Icon className={classes.menuButton} color='inherit'>add_circle</Icon>
            <span>Upload</span>
          </Button>

          <Button color="inherit" className={classes.menuButton} component={Link} to='/profile'>Profile</Button>
          <Button color="inherit" className={classes.menuButton} component={Link} to='/login'>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
