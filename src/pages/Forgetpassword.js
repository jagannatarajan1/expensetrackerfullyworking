import React from "react";
import { Button } from "react-bootstrap";

import { useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
  const email = useRef();
  const nav = useNavigate();
  const forgotpasswordhandler = (event) => {
    event.preventDefault();
    const enterdemail = email.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBc0lCG-mS1XwpGRxe_FQ3xt9ZTzSwTEmw",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enterdemail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert(
            "Check your email , you might have recieved a reset password link . Click on it to reset your password"
          );
        }
        res.json().then((data) => {
          console.log(data);
        });
        nav("/loginpage");
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <React.Fragment>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <Form className="border ps-5 pt-5 pb-5">
          <Form.Group
            as={Row}
            className="mb-3 w"
            controlId="formPlaintextEmail"
          >
            <Form.Label>Email</Form.Label>
            <Col sm="10">
              <Form.Control placeholder="email@example.com" ref={email} />
            </Col>
          </Form.Group>

          <div className="d-grid gap-4 col-9 mx-3">
            <Button onClick={forgotpasswordhandler} variant="primary">
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};
export default Forgotpassword;
