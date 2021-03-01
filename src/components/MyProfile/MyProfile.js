import React, { useState } from "react";

import SideBar from "../sidebar/SideBar";
import MyProfileContent from "./MyProfileContent";

const MyProfile = () => {

    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    return (
        <div className="App wrapper">
            <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
            <MyProfileContent toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
        </div>
    );
};

export default MyProfile;
