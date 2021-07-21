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
<<<<<<< frontend/src/Channels.js
 * @param {*} setMessages
 * @param {*} id
 */ /*
*/

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    // bottom: 0,
    margin: 0,
  },
  bottomNav: {
    position: 'fixed',
    bottom: '0%',
    margin: 'auto',
    width: '100%',
  },
}));

/**
 *
=======
>>>>>>> frontend/src/Channels.js
 * @return {object}
 */
function Channels() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [channels, setChannels] = React.useState([]);
  // const [name, setName] = React.useState(user ? user.name : '');
  // const [error, setError] = React.useState('Logged out');
  const history = useHistory();

  const handleChange = (event) => {
    history.push('/messages/' + event.currentTarget.id);
  };

  const classes = useStyles();

  React.useEffect(() => {
    fetchChannels(setChannels /* , setError */);
  }, []);

  return (
    <div className={classes.root}>
      <h2 id='category'>Channels</h2>
      <div id='channels'>
        {channels.map((channel) => {
          let list = '';
          if (channel.category === 'Channels') {
            list = (
              <table key={channel.name}><tbody><tr><td><button
                id={channel.id}
                onClick={handleChange}>#{channel.name}
              </button></td></tr></tbody></table>
            );
          } return list;
        })}
      </div>
      <h2 id='category'>Direct Messages</h2>
      <div id='channels'>
        {channels.map((channel) => {
          let list = '';
          if (channel.category === 'DMs') {
            list = (
              <table key={channel.name}><tbody><tr><td><button>{channel.name}
              </button></td></tr></tbody></table>
            );
          } return list;
        })}
      </div>
      <div id='channels'>
      </div>
      <button onClick={() => history.push('/channels')}>Home</button>
      <BottomNavigation
        className={classes.bottomNav}>
        {/* value={value} onChange={handleChange} className={classes.root}> */}
        <BottomNavigationAction
          label="Home" value="home" icon={<HomeIcon />} />
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

export default Channels;

