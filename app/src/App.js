import logo from './logo.svg';
import Home from './Home';
import Menu from './Menu';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 275;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    backgroundColor: theme.palette.background.default,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className={classes.root}>
      <CssBaseline/>
      <Drawer className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="left">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap>
            MOSAIC RAAMP2
          </Typography>
        </Toolbar>
        <Divider />
        <Menu></Menu>
      </Drawer>
      <main id="main-container">
        <Home></Home>
      </main>
    </div>
  </div>

  );
}

export default App;
