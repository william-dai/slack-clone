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
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReplyIcon from '@material-ui/icons/Reply';

/**
 *
 * @param {*} setMessages
 * @param {*} id
 */
function fetchMessages(setMessages, id) {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/message/' + id, {
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
      setMessages(json);
    })
    .catch((error) => {
      console.log(error);
      setMessages([]);
    });
};

/**
 *
 * @param {*} sent
 * @param {*} message
 */
function addMessage(sent, message) {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/message', {
    method: 'POST',
    body: JSON.stringify(sent),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then(() => {
      message(sent);
    })
    .catch((error) => {
      console.log(error);
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
    bottom: '0%',
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
function Messages() {
  const history = useHistory();
  const item = localStorage.getItem('user');
  const user = JSON.parse(item);
  let data = window.location.pathname;
  data = data.substring(data.lastIndexOf('/') + 1);

  const [messages, setMessages] = React.useState([]);
  let [send, setSend] = React.useState('');
  let [sent, setSent] = React.useState({});

  const handleInputChange = (event) => {
    setSend(send = event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSent(sent = {message: send, channel: data, name: user.name});
    addMessage(sent, messages);
    fetchMessages(setMessages, data);
  };

  const classes = useStyles();

  const timeStamp = (time) => {
    const temp = new Date(time);
    let hours = temp.getHours();
    let minutes = temp.getMinutes();
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return hours + ':' + minutes;
  };

  React.useEffect(() => {
    fetchMessages(setMessages, data);
  }, [data]);

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: '#39123e'}}>
        <Toolbar>
          <IconButton edge="start"
            className={classes.menuButton} color="inherit" aria-label="menu"
            onClick={() => history.push('/channels')}>
            {/* <ArrowDropDownCircleIcon /> */}
            <ArrowBackIcon/>

          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {/* {channels.workspaceid} */}
            General
            {/* {workspace[work].name} */}
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{maxHeight: '70%', overflow: 'auto'}}>
        {messages.map((message, index) => (
          <div>
            <List component='nav'
              aria-label='main mailbox folders' key={index}>
              <ListItem className={classes.list}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={message.createdby}
                  secondary={message.content}/>
                <ListItemText style={{textAlign: 'right'}}
                  primary={timeStamp(message.createdtime)}/>
                <IconButton
                  onClick={() => history.push('/replies/'+message.channelid)}>
                  <ReplyIcon/>
                </IconButton>
              </ListItem>
            </List>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <TextField id="outlined-basic" variant="outlined"
          placeholder="Message" value={send} onChange={handleInputChange}
          className={classes.inputText} size="small" InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" value="Submit">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}/>
      </form>

      <BottomNavigation
        className={classes.bottomNav}>
        <BottomNavigationAction
          label="Home" value="home" icon={<HomeIcon />}
          onClick={() => history.push('/channels')}/>
        <BottomNavigationAction
          label="Messages" value="messages" icon={<ForumIcon />} />
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

export default Messages;
