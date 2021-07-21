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
  let data = window.location.pathname;
  data = data.substring(data.lastIndexOf('/') + 1);

  const [messages, setMessages] = React.useState([]);
  let [send, setSend] = React.useState('');

  const handleInputChange = (event) => {
    setSend(send = event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(send);
  };

  React.useEffect(() => {
    fetchMessages(setMessages, data);
  }, [data]);

  return (
    <div>
      <p>test</p>
      {messages.map((message, index) => (
        <p key={index}>{message.content}</p>
      ))}
      <button onClick={() => history.push('/channels')}>Home</button>
      <form onSubmit={onSubmit}>
        <input type="message" placeholder="placeholder text"
          value={send} onChange={handleInputChange}/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
};

export default Messages;
