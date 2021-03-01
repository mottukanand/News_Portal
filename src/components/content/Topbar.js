import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
  let history = useHistory();
  var currentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));

  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

  const handleLogout = () => {
    localStorage.removeItem("currentLoggedInUser");
    localStorage.removeItem("readLaterItems");
    history.push("/login")
  }
  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="md"
    >
      <Button color="info" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink>
            <Button color ="primary">{currentUser.name}</Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
            <Button color ="success" onClick={() => history.push("/myprofile")}>My Profile</Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
            <Button color ="info" onClick={() => history.push("/readLaterArticles")}>Read Later</Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
             <Button color ="danger" onClick = {handleLogout}>Logout</Button>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Topbar;
