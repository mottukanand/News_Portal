import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from "react-router-dom";


const SideBar = ({ isOpen, toggle }) => {
  let history = useHistory();

  const [sideMenus, setSideMenus] = useState([])

  useEffect(() => {
    axios.get("https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7")
      .then(response => setSideMenus(response.data.results))
  }, [])

  return (<div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>News Portal</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <NavItem >
                <NavLink tag={Link} onClick ={(e) => {e.preventDefault() ;history.push("/articles/all")}}>
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                  All
                </NavLink>
              </NavItem>
        {
          sideMenus && sideMenus.length ?
            sideMenus.map((menu, index) =>
              <NavItem key={index}>
                <NavLink href= "#" onClick ={(e) => {e.preventDefault() ;history.push(`/articles/${menu.section}`)}}>
                  <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                  {menu.display_name}
                </NavLink>
              </NavItem>
            )
            :
            null
        }
      </Nav>
    </div>
  </div>
  )
}


export default SideBar;
