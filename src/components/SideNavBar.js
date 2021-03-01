import React, { useState } from "react";

import SideBar from "./sidebar/SideBar";
import Content from "./content/Content";

const SideNavBar = () => {

  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
      <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
    </div>
  );
};

export default SideNavBar;
