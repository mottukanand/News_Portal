import React, { useState } from "react";

import SideBar from "../sidebar/SideBar";
import ReadLaterContent from "./ReadLaterContent";

const ReadLater = () => {

    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    return (
        <div className="App wrapper">
            <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
            <ReadLaterContent toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
        </div>
    );
};

export default ReadLater;
