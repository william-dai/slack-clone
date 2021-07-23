import React from 'react';
import {useHistory} from 'react-router-dom';

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

/**
 *
 * @return {object}
 */
function DMs() {
  const history = useHistory();
  const item = localStorage.getItem('user');
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
    <div>
      {messages.sort((a, b) => (
        a.createdtime > b.createdtime) ? 1 : -1).map((message, index) => (
        <div key={index}>
          <p>{message.createdby} : {timeStamp(message.createdtime)}</p>
          <p>{message.content}</p>
        </div>
      ))}
      <button onClick={() => history.push('/channels')}>Home</button>
      <button onClick={() => history.push('/dms')}>DMs</button>
    </div>
  );
};

export default DMs;
