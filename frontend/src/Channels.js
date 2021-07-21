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
 * @param {*} setMessages
 * @param {*} id
 */
function fetchMessages(setMessages, id) {
  /* const item = localStorage.getItem('user');
  if (!item) {
    return;
  } */
  console.log('test ' + id);
  fetch('/v0/message/' + id, {
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
      setMessages(json);
    })
    .catch((error) => {
      console.log(error);
      setMessages([]);
    });
}

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
  let [messageDisplay, setMessageDisplay] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  /* const logout = () => {
    localStorage.removeItem('user');
    setChannels([]);
    setName('');
    setError('Logged Out');
    history.push('/');
  } */

  const handleChannelChange = (event) => {
    console.log(event.currentTarget.id);
    setMessageDisplay(messageDisplay = true);
    console.log(messageDisplay);
    fetchMessages(setMessages, event.currentTarget.id);
  };

  React.useEffect(() => {
    fetchChannels(setChannels /* , setError */);
  }, []);

  return (
    <div>
      <h2 id='category'>Channels</h2>
      <div id='channels'>
        {channels.map((channel) => {
          if (channel.category === 'Channels') {
            return (
              <table key={channel.name}><tbody><tr><td><button
                id={channel.id}
                onClick={handleChannelChange}>#{channel.name}
              </button></td></tr></tbody></table>
            );
          }
        })}
      </div>
      <h2 id='category'>Direct Messages</h2>
      <div id='channels'>
        {channels.map((channel) => {
          if (channel.category === 'DMs') {
            return (
              <table key={channel.name}><tbody><tr><td><button>{channel.name}
              </button></td></tr></tbody></table>
            );
          }
        })}
      </div>
      <div id='channels'>
      </div>
      <button onClick={() => history.push('/channels')}>Home</button>
      <h2>Placeholder Messages</h2>
      <div open={messageDisplay}>
        <div id='messages'>
          {messages.map((message) => (
            <tbody><tr><td>{message}</td></tr></tbody>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Channels;

