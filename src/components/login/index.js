import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
import LoginForm from "./LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { useHistory } from "react-router-dom";

const Login = () => {
    let history = useHistory();

    return (
        <div className="AppNew">
            <Container>
                <Row>
                    <Col />
                    <Col lg="8">
                        <Jumbotron>
                            <h3>
                                <u>Login Form</u>
                            </h3>
                            <hr />
                            <Card>
                                <CardBody>
                                    <LoginForm history ={history}/>
                                </CardBody>
                            </Card>
                        </Jumbotron>
                    </Col>
                    <Col />
                </Row>
            </Container>
        </div>
    );
}

export default Login
