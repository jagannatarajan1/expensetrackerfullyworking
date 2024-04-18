import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import "./Home.css";
import Verifyemail from "./Verifyemail";
import { Button } from "react-bootstrap";
import Listofexpense from "../components/login/Formforexpensetracker/Listofexpense";
import Formforexpensetracker from "../components/login/Formforexpensetracker/Formforexpensetracker";
import { useSelector } from "react-redux";
const Home = (props) => {
  const isDarkMode = useSelector((state) => state.expense.darkmode);
  const theme = isDarkMode ? "dark" : "light";
  const nav = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    nav("/loginpage");
  };
  return (
    <React.Fragment>
      <Navbar className={`headerColor-${theme}`}>
        <Container>
          <Navbar.Brand className={`bgprofilecolor-${theme}`}>
            {" "}
            Welcome to Expense Tracker!!!
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <div className="bgprofilecolor">
              <Navbar.Text>
                Your profile is Incomplete
                <NavLink
                  to="/yourprofile"
                  style={({ isActive, isPending, isTransitioning }) => {
                    return {
                      padding: isPending ? "1px" : "2px",
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "blue",
                      viewTransitionName: isTransitioning ? "slide" : "",
                      Hover: "red",
                    };
                  }}
                >
                  Complete Now
                </NavLink>
              </Navbar.Text>
            </div>
            <Button className="ms-3" onClick={logoutHandler}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="verify-email-container">
        <Verifyemail />
      </div>
      <Formforexpensetracker />
      <Listofexpense />
    </React.Fragment>
  );
};
export default Home;
