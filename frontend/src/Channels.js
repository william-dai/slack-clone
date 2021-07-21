import React from 'react';
import {useHistory} from 'react-router-dom';

/**
 *
 * @param {*} setChannels
 */
function fetchChannels(setChannels) {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  fetch('/v0/channel', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
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
 * @return {object}
 */
function Channels() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [channels, setChannels] = React.useState([]);
  // const [name, setName] = React.useState(user ? user.name : '');
  // const [error, setError] = React.useState('Logged out');
  const history = useHistory();

  /* const logout = () => {
    localStorage.removeItem('user');
    setChannels([]);
    setName('');
    setError('Logged Out');
    history.push('/');
  } */

  React.useEffect(() => {
    fetchChannels(setChannels /* , setError */);
  }, []);

  return (
    <div>
      <h2 id='category'>Channels</h2>
      <div id='channels'>
        {channels.map((channel) => (
          <table key={channel.name}><tbody><tr><td><button>#{channel.name}
          </button></td></tr></tbody></table>
        ))}
      </div>
      <h2 id='category'>Direct Messages</h2>
      <div id='channels'>
      </div>
      <button onClick={() => history.push('/channels')}>[ ]</button>
    </div>
  );
};

export default Channels;

