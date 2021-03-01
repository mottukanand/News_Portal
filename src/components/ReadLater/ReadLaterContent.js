import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";

import Topbar from "../content/Topbar";
import ReadLaterArticles from './ReadLaterArticles';

const ReadLaterContent = ({ sidebarIsOpen, toggleSidebar }) => {
  return(<Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <ReadLaterArticles />
  </Container>
)}

export default ReadLaterContent;
