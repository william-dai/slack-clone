import React from 'react';
import {useHistory} from 'react-router-dom';

/**
 *
 * @param {*} setMessage
 * @param {*} id
 */
function fetchMessage(setMessage, id) {
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
      setMessage(json);
    })
    .catch((error) => {
      console.log(error);
      setMessage([]);
    });
}

/**
 *
 * @param {*} setReplies
 * @param {*} id
 */
function fetchReplies(setReplies, id) {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/reply/' + id, {
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
      setReplies(json);
    })
    .catch((error) => {
      console.log(error);
      setReplies([]);
    });
};

/**
 *
 * @param {*} sent
 * @param {*} message
 */
function addReply(sent, message) {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/reply', {
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

/**
 *
 * @return {object}
 */
function Replies() {
  const history = useHistory();
  const item = localStorage.getItem('user');
  if (!item) {
    history.push('/');
  }
  let data = window.location.pathname;
  data = data.substring(data.lastIndexOf('/') + 1);
  const [replies, setReplies] = React.useState([]);
  const [message, setMessage] = React.useState([]);
  let [send, setSend] = React.useState('');
  let [sent, setSent] = React.useState({});
  const user = JSON.parse(item);

  const handleInputChange = (event) => {
    setSend(send = event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSent(sent = {reply: send, message: data, name: user.name});
    addReply(sent, replies);
    fetchReplies(setReplies, data);
  };

  React.useEffect(() => {
    fetchReplies(setReplies, data);
  }, [data]);

  React.useEffect(() => {
    fetchMessage(setMessage, data);
  }, [data]);

  return (
    <div>
      <h2>testing</h2>
      {message.map((message, index) => (
        <div>
          <p key={index}>{message.createdby} : {message.createdtime}</p>
          <p>{message.content}</p>
        </div>
      ))}
      {replies.map((reply, index) => (
        <div>
          <p key={index}>
            {reply.createdby} : {reply.createdtime}</p>
          <p>{reply.content}</p>
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <input type="message" placeholder="placeholder text"
          value={send} onChange={handleInputChange}/>
        <input type="submit" value="Submit"/>
      </form>
      {message.map((message) => (
        <div>
          <button onClick={() => history.push(
            '/messages/' + message.channelid)}>Return to Thread</button>
        </div>
      ))}
    </div>
  );
}

export default Replies;
