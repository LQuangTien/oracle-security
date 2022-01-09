import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions";
import Input from "../../components/UI/Input";
function Signin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (auth.authenticate) {
    return <Redirect to="/users" />;
  }

  const userLogin = (e) => {
    e.preventDefault();
    const user = { username, password };
    dispatch(login(user));
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Form onSubmit={userLogin} className="w-25">
        {auth.error && <p style={{ color: "red" }}>Error: {auth.error}</p>}

        <Input
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Submitt
        </Button>
      </Form>
    </div>
  );
}

Signin.propTypes = {};

export default Signin;
