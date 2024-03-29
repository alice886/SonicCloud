import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const demoLogin = (e) => {
    e.preventDefault();
    // setCredential('Riri');
    // setPassword('password3');
    // return dispatch(sessionActions.login({ credential, password })).catch(
    return dispatch(sessionActions.login({ credential: 'cookiemonster', password: 'password' }))
      .then(() => {
        history.push('/');
        window.alert('you are successfully signed in');
      })
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="log-in-form">
      <form onSubmit={handleSubmit}>
        <label> - Log In - </label>
        <ul id='loginform'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder={'your username here'}
          // disabled={true}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={'your password here'}
          // disabled={true}
          />
        </label>
        <div className="button-container">
          <button type="submit">Log In</button>
          <button type="submit" onClick={demoLogin} >Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
