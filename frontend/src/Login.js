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
    /* authentication goes here */
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
