import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
import RegistrationForm from "./RegistrationForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { useHistory } from "react-router-dom";

const Registration = () => {
    let history = useHistory();
    return (
        <div className="AppNew">
            <Container>
                <Row>
                    <Col />
                    <Col lg="8">
                        <Jumbotron>
                            <h3>
                                <u>Registration Form</u>
                            </h3>
                            <hr />
                            <Card>
                                <CardBody>
                                    <RegistrationForm history={history}/>
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

export default Registration
