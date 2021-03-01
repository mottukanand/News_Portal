import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";

import Topbar from "./Topbar";
import Articles from './Articles';

const Content = ({ sidebarIsOpen, toggleSidebar }) => {
  return (
    <Container
      fluid
      className={classNames("content", { "is-open": sidebarIsOpen })}
    >
      <Topbar toggleSidebar={toggleSidebar} />
      <Articles />
    </Container>
  )
}

export default Content;
