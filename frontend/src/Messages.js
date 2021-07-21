import React from 'react';
import {useHistory} from 'react-router-dom';

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
 * @return {object}
 */
function Messages() {
  const history = useHistory();
  const [messages, setMessages] = React.useState([]);

  let data = window.location.pathname;
  data = data.substring(data.lastIndexOf('/') + 1);
  console.log(data);

  React.useEffect(() => {
    fetchMessages(setMessages, data);
  }, []);

  console.log(messages);

  return (
    <div>
      <p>test</p>
      {messages.map((message, index) => (
        <p key={index}>{message.content}</p>
      ))}
      <button onClick={() => history.push('/channels')}>Home</button>
    </div>
  );
};

export default Messages;
