import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Container, Card, CardBody, CardFooter, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useHistory } from 'react-router-dom';

import Topbar from "../content/Topbar";

const MyProfileContent = ({ sidebarIsOpen, toggleSidebar }) => {
  var history = useHistory();
  var currentLoggedInUser = JSON.parse(localStorage.getItem("currentLoggedInUser")) || {};


  const [loggedInIser, setLoggedInUser] = useState(currentLoggedInUser)
  const [inputDisabled, setInputDisabled] = useState(true)

  const handleSaveProfile = () => {
    var storedUsers = JSON.parse(localStorage.getItem("storedUsers")) || [];
    let userIndex = storedUsers.findIndex(user => user.email === loggedInIser.email);
    currentLoggedInUser = JSON.parse(localStorage.getItem("currentLoggedInUser")) || {};
    storedUsers[userIndex]["password"] = loggedInIser.password;
    storedUsers[userIndex]["name"] = loggedInIser.name;

    currentLoggedInUser["password"] = loggedInIser.password;
    currentLoggedInUser["name"] = loggedInIser.name;

    localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
    localStorage.setItem("currentLoggedInUser", JSON.stringify(currentLoggedInUser));
    setLoggedInUser(currentLoggedInUser)
    setInputDisabled(true)
  }

  const handleDelete = () => {
    let storedUsers = JSON.parse(localStorage.getItem("storedUsers")) || [];
    let userIndex = storedUsers.findIndex(user => user.email === loggedInIser.email);
    storedUsers.splice(userIndex, 1)
    localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
    localStorage.removeItem("currentLoggedInUser");
    localStorage.removeItem("readLaterItems");
    history.push("/login")
  }

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": sidebarIsOpen })}
    >
      <Topbar toggleSidebar={toggleSidebar} />
      <Card>
        <CardBody>
          <AvForm
          // onValidSubmit={this.handleValidSubmit}
          // onInvalidSubmit={this.handleInvalidSubmit}
          >
            <AvField
              name="email"
              label="Email"
              type="text"
              value={loggedInIser.email}
              disabled={true}
              validate={{
                required: true,
                email: true
              }}
            />
            <AvField
              name="password"
              label="Password"
              type="text"
              value={loggedInIser.password}
              onChange={(e) => setLoggedInUser({ ...loggedInIser, password: e.target.value })}
              disabled={inputDisabled}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter your password"
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                  errorMessage:
                    "Your password must be composed only with letter and numbers"
                },
                minLength: {
                  value: 6,
                  errorMessage: "Your password must be between 6 and 20 characters"
                },
                maxLength: {
                  value: 20,
                  errorMessage: "Your password must be between 6 and 20 characters"
                }
              }}
            />
            <AvField
              name="name"
              label="Name"
              type="text"
              value={loggedInIser.name}
              onChange={(e) => setLoggedInUser({ ...loggedInIser, name: e.target.value })}
              disabled={inputDisabled}
              errorMessage="Invalid name"
              validate={{
                required: { value: true },
                pattern: { value: '^[A-Za-z0-9 ]+$' },
                minLength: { value: 1 },
              }} />
            {/* <Button id="submit">Submit</Button> */}
          </AvForm>

        </CardBody>
        <CardFooter>
          {
            inputDisabled ?
              <>
                <Button color="danger" className="ml-2" onClick={handleDelete}>Delete Profile</Button>
                <Button color="primary" className="ml-2" onClick={() => setInputDisabled(!inputDisabled)}>Edit Profile</Button>
              </>
              :
              <>
                <Button color="danger" className="ml-2" onClick={() => setInputDisabled(!inputDisabled)}>Cancel</Button>
                <Button color="primary" className="ml-2" onClick={() => handleSaveProfile()}>Save</Button>
              </>
          }

        </CardFooter>
      </Card>
    </Container>
  )
}

export default MyProfileContent;
