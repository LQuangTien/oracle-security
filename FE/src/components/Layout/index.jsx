import React from "react";
import Header from "../Header";
import { Container, Col, Row, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ReceiptIcon from "@mui/icons-material/Receipt";
import "./style.css";
function Layout(props) {
  const auth = useSelector((state) => state.auth);
  const wasLoggedIn = () => (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <ul>
            <li>
              <NavLink exact to="/users">
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/profiles">Profiles</NavLink>
            </li>
            <li>
              <NavLink to="/roles">Roles</NavLink>
            </li>
            <li>
              <NavLink to="/privilege">Privilege</NavLink>
            </li>
          </ul>
        </Col>
        <Col md={10} style={{ marginLeft: "auto", paddingTop: "60px" }}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
  return (
    <>
      <Header />
      {auth.authenticate ? wasLoggedIn() : props.children}
    </>
  );
}

export default Layout;
