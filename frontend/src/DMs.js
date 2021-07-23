import React from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {BottomNavigation} from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import TextField from '@material-ui/core/TextField';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ReplyIcon from '@material-ui/icons/Reply';
// import Divider from '@material-ui/core/Divider';

/**
 *
 * @param {*} setMessages
 */
function fetchMessages(setMessages) {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/message?dms=true', {
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
      setMessages(json);
    })
    .catch((error) => {
      console.log(error);
      setMessages([]);
    });
}

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
    bottom: 0,
    margin: 'auto',
    width: '100%',
  },
  list: {
    margin: 0,
  },
  inputText: {
    position: 'fixed',
    bottom: 60,
    width: '100%',
  },
}));


/**
 *
 * @return {object}
 */
function DMs() {
  const history = useHistory();
  const item = localStorage.getItem('user');
  const classes = useStyles();
  if (!item) {
    history.push('/');
  }

  const [messages, setMessages] = React.useState([]);

  const timeStamp = (time) => {
    const temp = new Date(time);
    const currDay = new Date();
    const temp2 = new Date(currDay.getFullYear(), currDay.getMonth(),
      currDay.getDate(), currDay.getHours() + 7, currDay.getMinutes(),
      currDay.getSeconds());

    if (temp.getFullYear() === temp2.getFullYear() &&
      temp.getMonth() === temp2.getMonth() &&
      temp.getDate() === temp2.getDate()) {
      let hours = temp.getHours();
      let minutes = temp.getMinutes();
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      return hours + ':' + minutes;
    } else {
      return temp.getMonth() + '/' + temp.getDate() +
      '/' + temp.getFullYear();
    }
  };

  React.useEffect(() => {
    fetchMessages(setMessages);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#39123e'}}>
        <Toolbar>
          <IconButton edge="start"
            className={classes.menuButton} color="inherit" aria-label="menu"
            onClick={() => history.push('/channels')}>
            <ArrowBackIcon/>
          </IconButton>
          <Typography variant="h6" component={'div'}>Messages</Typography>
        </Toolbar>
      </AppBar>

      {messages.sort((a, b) => (
        a.createdtime > b.createdtime) ? 1 : -1).map((message, index) => (
        <div key={index}>
          <List component='nav'
            aria-label='main mailbox folders' key={index}>
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                primary={message.createdby+' : '+timeStamp(message.createdtime)}
                secondary={message.content}
              />
            </ListItem>
          </List>
        </div>
      ))}

      <BottomNavigation
        className={classes.bottomNav}>
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

export default DMs;
