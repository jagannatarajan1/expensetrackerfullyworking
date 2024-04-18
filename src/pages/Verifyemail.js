import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function Verifyemail() {
  const [verify, setVerify] = useState(localStorage.getItem("verifyEmail"));
  const tokenSelector = useSelector((state) => state.auth.logintoken);

  const verifyemailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBc0lCG-mS1XwpGRxe_FQ3xt9ZTzSwTEmw",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: tokenSelector,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setVerify(data);
      localStorage.setItem("verifyEmail", true);
      alert(
        "Check your email, you might have received a verification link.Click on it to verify."
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {!verify && (
        <Container className="m-5 border pt-5 pb-5">
          <div>
            <Row className="text-center pb-2">
              <Col>
                <h6> Please Verify Your Email </h6>
              </Col>
            </Row>
            <Row className="justify-content-center">
              {" "}
              {/* Adjusted */}
              <Col xs="auto">
                <Button onClick={verifyemailHandler}>Click to verify</Button>
              </Col>
            </Row>
          </div>
        </Container>
      )}
    </React.Fragment>
  );
}

export default Verifyemail;
