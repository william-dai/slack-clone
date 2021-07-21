import React from 'react';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
        localStorage.setItem('user', JSON.stringify(json));
        history.push('/channels');
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to authenticate the user. Please try again.');
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}
        style={{width: '50%', margin: 'auto', fontFamily: 'sans-serif'}}>
        <h2 id='signInTitle' style={{textAlign: 'center'}}>Login</h2>
        <TextField
          id="standard-password-input"
          style={{margin: 0}}
          label="Username"
          name="email"
          type="email"
          autoComplete="current-username"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-password-input"
          label="Password"
          name="pass"
          type="pass"
          autoComplete="current-password"
          onChange={handleInputChange}
        />
        <br /><br />
        <Button variant='contained' type = "submit"
          style={{backgroundColor: 'black', color: 'white', borderRadius: 0,
            textAlign: 'center', float: 'right'}}>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
