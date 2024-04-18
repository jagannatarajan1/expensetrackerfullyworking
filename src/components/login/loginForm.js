import { Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./loginForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/redux/authReducers";
import { expenseAction } from "../store/redux/expenseReducers";

const LoginForm = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const password = useRef();
  const confirmPassword = useRef();
  const [emailValid, setEmailValid] = useState(true);

  const already = () => {
    setLogin((prevLogin) => !prevLogin);
  };

  const forgothandler = () => {
    nav("/Forgotpassword");
  };

  const emailChangeHandler = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    setEmailValid(emailRegex.test(enteredEmail));
  };

  const formhandler = (event) => {
    event.preventDefault();
    const enteredPassword = password.current.value;

    if (!login) {
      const enteredConfirmPassword = confirmPassword.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Password and Confirm Password do not match");
        return;
      }
    }

    let url;
    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBc0lCG-mS1XwpGRxe_FQ3xt9ZTzSwTEmw";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBc0lCG-mS1XwpGRxe_FQ3xt9ZTzSwTEmw";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Authentication failed");
        }
        return res.json();
      })
      .then((data) => {
        dispatch(authAction.login(data));
        dispatch(expenseAction.emailReducer(data));
        nav("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <Form className="border ps-5 pt-5 pb-5">
        <Form.Group as={Row} className="mb-3 w" controlId="formPlaintextEmail">
          <Form.Label>Email</Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="email@example.com"
              onChange={emailChangeHandler}
              value={email}
            />
          </Col>
          <div className="pc">
            {!emailValid && (
              <p className="invalid">Please enter a valid email address</p>
            )}
          </div>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label>Password</Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              placeholder="Password"
              ref={password}
            />
          </Col>
        </Form.Group>
        {!login && (
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="confirmformPlaintextPassword"
          >
            <Form.Label>Confirm Password</Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={confirmPassword}
              />
            </Col>
          </Form.Group>
        )}
        <div className="forgotPasssword">
          <p onClick={forgothandler}>Forgot password?</p>
        </div>

        <div className="d-grid gap-4 col-9 mx-3">
          {!login && emailValid && (
            <Button onClick={formhandler} variant="primary">
              SignUp
            </Button>
          )}
          {login && emailValid && (
            <Button onClick={formhandler} variant="primary">
              SignIn
            </Button>
          )}
        </div>
      </Form>
      <p
        className="already container d-flex justify-content-center "
        onClick={already}
      >
        {login ? "Don't have an account? SignUp" : "Already have an account?"}
      </p>
    </div>
  );
};

export default LoginForm;
