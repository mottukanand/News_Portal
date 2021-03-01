import React from "react";
import { Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link } from 'react-router-dom';


export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: false };
  }

  handleValidSubmit = (event, values) => {
    this.setState({ email: values.email });
    var storedUsers = JSON.parse(localStorage.getItem("storedUsers")) || [];
    if (storedUsers.length) {
      let sameEmail = storedUsers.findIndex(user => user.email === values.email);
      if (sameEmail === -1) {
        let arr = [...storedUsers];
        arr.push(values)
        localStorage.setItem("storedUsers", JSON.stringify(arr));
        this.props.history.push("/login");
      } else {
        alert("User Already Exist")
      }
    } else {
      let arr = [];
      arr.push(values)
      localStorage.setItem("storedUsers", JSON.stringify(arr));
      this.props.history.push("/login");
    }


  };

  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ email: values.email, error: true });
  };

  render() {
    return (
      <AvForm
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
      >
        <AvField
          name="email"
          label="Email"
          type="text"
          validate={{
            required: true,
            email: true
          }}
        />
        <AvField
          name="password"
          label="Password"
          type="password"
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
          errorMessage="Invalid name"
          validate={{
            required: { value: true },
            pattern: { value: '^[A-Za-z0-9 ]+$' },
            minLength: { value: 1 },
          }} />
        <Button id="submit">Submit</Button>
        <div>
          <Link to="/login" style={{ float: "right" }}>Login</Link>
        </div>
      </AvForm>
    );
  }
}
