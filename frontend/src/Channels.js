import {BottomNavigation} from '@material-ui/core';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/**
 *
 * @param {*} setChannels
 */
function fetchChannels(setChannels) {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/channel', {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((json) => {
      // setError('');
      setChannels(json);
    })
    .catch((error) => {
      console.log(error);
      setChannels([]);
      // setError(`${error.status} - ${error.statusTest}`);
    });
};

/**
 *
 * @param {*} setWorkspace
 */
function fetchWorkspace(setWorkspace) {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/workspace', {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((json) => {
      setWorkspace(json);
    })
    .catch((error) => {
      console.log(error);
      setWorkspace([]);
    });
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    margin: 0,
    left: 0,
    top: 0,
  },
  bottomNav: {
    position: 'fixed',
    bottom: '0%',
    margin: 'auto',
    width: '100%',
  },
  list: {
    margin: 0,
    padding: 0,
    paddingLeft: 10,
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
  },
  menuButton: {
    right: 0,
    position: 'fixed',
  },
  title: {
    fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
  },
}));

/**
 *
 * @return {object}
 */
function Channels() {
  const [channels, setChannels] = React.useState([]);
  const [workspace, setWorkspace] = React.useState([]);
  let [work, changeWork] = React.useState(0);
  let [headerName, changeHeader] = React.useState('CSE183');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const item = localStorage.getItem('user');
  if (!item) {
    history.push('/');
  }

  const handleChange = (event) => {
    history.push('/messages/' + event.currentTarget.id);
  };

  const handleWork = (event) => {
    if (work === 0 && event.currentTarget.innerText === 'CSE130') {
      changeHeader(headerName = 'CSE130');
      changeWork(work = 1);
    } else if (work === 1 && event.currentTarget.innerText === 'CSE183') {
      changeHeader(headerName = 'CSE183');
      changeWork(work = 0);
    }
  };

  const classes = useStyles();

  React.useEffect(() => {
    fetchWorkspace(setWorkspace);
  }, []);

  React.useEffect(() => {
    fetchChannels(setChannels);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (event) => {
    handleWork(event);
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#39123e'}}>
        <Toolbar>
          <IconButton edge="start"
            className={classes.menuButton} color="inherit" aria-label="menu"
            onClick={handleMenu}>
            <ArrowDropDownCircleIcon />
          </IconButton>
          {workspace.map((workButton) => {
            const menu = (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                key={workButton.name}
              >
                <MenuItem onClick={(event) => closeMenu(event)}
                  key='183'>CSE183</MenuItem>
                <MenuItem onClick={(event) => closeMenu(event)}
                  key='130'>CSE130</MenuItem>
              </Menu>
            );
            return menu;
          })}
          <Typography variant="h6" className={classes.title}>
            {headerName}
          </Typography>
        </Toolbar>
      </AppBar>
      <h4 id='category'
        style={{margin: 0, marginTop: 5, paddingLeft: 10,
          fontFamily: '"Comic Sans MS", "Comic Sans", cursive'}}>
          Channels
      </h4>
      <div id='channels' style={{paddingLeft: 10}}>
        {channels.map((channel) => {
          let list = '';
          if (channel.category === 'Channels'/* &&
          channel.workspaceid === workspace[work].id */) {
            list = (
              <List component='nav'
                aria-label='main mailbox folders' key={channel.name}>
                <ListItem
                  button id={channel.id} className={classes.list}
                  onClick={handleChange} key={channel.name}>
                  <ListItemIcon
                    style={{width: '20px', minWidth: 0, fontSize: '14pt'}}>
                      #
                  </ListItemIcon>
                  <ListItemText primary={channel.name}/>
                </ListItem>
              </List>
            );
          } return list;
        })}
      </div>
      <h4 id='category'
        style={{margin: 0, marginTop: 1, paddingLeft: 10,
          fontFamily: '"Comic Sans MS", "Comic Sans", cursive'}}>
          Direct Messages
      </h4>
      <div id='channels' style={{paddingLeft: 10}}>
        {channels.map((channel) => {
          let list = '';
          if (channel.category === 'DMs') {
            list = (
              <List component='nav'
                aria-label='main mailbox folders' key={channel.name}>
                <ListItem button id={channel.id} className={classes.list}
                  onClick={handleChange}>
                  <ListItemIcon
                    style={{width: '20px', minWidth: 0, fontSize: '14pt'}}>
                      #
                  </ListItemIcon>
                  <ListItemText primary={channel.name}/>
                </ListItem>
              </List>
            );
          } return list;
        })}
      </div>
      <div id='channels'>
      </div>
      {/* <button onClick={() => history.push('/channels')}>Home</button> */}
      <BottomNavigation
        className={classes.bottomNav}>
        {/* value={value} onChange={handleChange} className={classes.root}> */}
        <BottomNavigationAction
          label="Home" value="home" icon={<HomeIcon />}
          onClick={() => history.push('/channels')}/>
        <BottomNavigationAction
          label="Messages" value="messages" icon={<ForumIcon />}
          onClick={() => history.push('/dms')} />
        <BottomNavigationAction
          label="At" value="at" icon={<AlternateEmailIcon />} />
        <BottomNavigationAction
          label="Search" value="search" icon={<SearchIcon />} />
        <BottomNavigationAction
          label="Profile" value="profile" icon={<PersonOutlineIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default Channels;
