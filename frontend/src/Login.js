import React from 'react';
/* import {useHistory} from "react-router-dom"; */

/**
 *
 * @return {object}
 */
function Login() {
  const [user, setUser] = React.useState({email: '', password: ''});
  /* const history = useHistory(); */

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const currUser = user;
    currUser[name] = value;
    setUser(currUser);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('/authenticate', {
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
        alert('test1');
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        alert('test');
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to authenticate user. Please try again.');
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 id='signInTitle'>Sign in to Kinda Slack</h2>
      <input type="email" name="email" placeholder="name@work-email.com"
        onChange={handleInputChange} required />
      <br />
      <input type="password" name="password" placeholder="Password"
        onChange={handleInputChange} required />
      <br /><br />
      <input type ="submit" value="submit" />
    </form>
  );
};

export default Login;
