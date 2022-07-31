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
    // setCredential('Riri');
    // setPassword('password3');
    // return dispatch(sessionActions.login({ credential, password })).catch(
    return dispatch(sessionActions.login({ credential: 'Riri', password: 'password3' })).catch(
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
        <button type="submit">Log In</button>
        <button type="submit" onClick={demoLogin} >Demo User</button>
      </form>
    </div>
  );
}

export default LoginForm;
