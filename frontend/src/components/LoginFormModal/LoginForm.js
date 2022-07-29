import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const demoLogin = (e) => {
    e.preventDefault();
    setCredential('Riri');
    setPassword('password3')
    return dispatch(sessionActions.login({ credential, password }))
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
    <form onSubmit={handleSubmit} >
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
          // required
          placeholder={'enter your username here'}
          disabled={true}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
          placeholder={'enter your password here'}
          disabled={true}
        />
      </label>
      <button type="submit">Log In</button>
      <button type="submit" onClick={demoLogin}>Demo User</button>
    </form>
  );
}

export default LoginForm;
