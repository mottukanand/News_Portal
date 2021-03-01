import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const Home = React.lazy(() => import("../components/Home"));
const Registration = React.lazy(() => import("../components/registration/index"));
const Login = React.lazy(() => import("../components/login/index"));
const ReadLaterArticles = React.lazy(() => import("../components/ReadLater/ReadLater"));
const MyProfile = React.lazy(() => import("../components/MyProfile/MyProfile"));

const checkAuth = () => {
    let user = JSON.parse(localStorage.getItem("currentLoggedInUser")) || {};
    if (user && user.email) {
        return true;
    } else {
        return false;
    }
};


class AppRoute extends Component {
    render() {
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="login" />} />
                        <Route exact path="/registration" component={Registration} />
                        <Route exact path="/login" render={(props) =>
                            checkAuth() ? (
                                <Redirect to="/articels/all" />

                            ) : (
                                    <Login {...props} />
                                )
                        } />
                        <Route exact path="/articles/:section"
                            render={(props) =>
                                checkAuth() ? (
                                    <Home {...props} />
                                ) : (
                                        <Redirect to="/login" />
                                    )
                            } />
                        <Route exact path="/readLaterArticles"
                            render={(props) =>
                                checkAuth() ? (
                                    <ReadLaterArticles {...props} />
                                ) : (
                                        <Redirect to="/login" />
                                    )
                            } />
                        <Route exact path="/myprofile"
                            render={(props) =>
                                checkAuth() ? (
                                    <MyProfile {...props} />
                                ) : (
                                        <Redirect to="/login" />
                                    )
                            } />
                        <Route
                            render={() => <Redirect to="/articles/all" />} />
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}
export default AppRoute;