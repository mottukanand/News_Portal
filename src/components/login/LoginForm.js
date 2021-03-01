import React from "react";
import { Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: false };
    }

    handleValidSubmit = (event, values) => {
        this.setState({ email: values.email });
        var storedUsers = JSON.parse(localStorage.getItem("storedUsers")) || [];
        let userExistIndex = storedUsers.findIndex(user => user.email === values.email && user.password === values.password);
        if(userExistIndex !== -1){
            localStorage.setItem("currentLoggedInUser", JSON.stringify(storedUsers[userExistIndex]));
            this.props.history.push("/articles/all")
        }else{
            alert("User Not Found.")
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
               
                <Button id="submit">Submit</Button>
                <div>
                <Link to = "/registration" style={{float :"right"}}>Registration</Link>
                    </div>
            </AvForm>
        );
    }
}
