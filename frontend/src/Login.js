import React from 'react';
import {useHistory} from 'react-router-dom';

/**
 *
 * @return {object}
 */
function Login() {
  const [user, setUser] = React.useState({email: '', pass: ''});
  const history = useHistory();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const currUser = user;
    currUser[name] = value;
    setUser(currUser);
    console.log(user);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(user));
    fetch('/v0/authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
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
        console.log('test');
        localStorage.setItem('user', JSON.stringify(json));
        history.push('/test');
      })
      .catch((err) => {
        console.log(err);
        alert('Error logging in, please try again');
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 id='signInTitle'>Sign in to Kinda Slack</h2>
      <input type="email" name="email" placeholder="name@work-email.com"
        onChange={handleInputChange} required />
      <br />
      <input type="pass" name="pass" placeholder="Password"
        onChange={handleInputChange} required />
      <br /><br />
      <input type ="submit" value="submit" />
    </form>
  );
};

export default Login;
