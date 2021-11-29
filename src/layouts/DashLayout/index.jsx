import React, { useState } from "react";
import { Route } from "react-router-dom";
import { DashboardHome } from "../../pages";
import { SideBar } from "../../components";

import styles from "./dashboard-layout.module.css";
import { DashHeader } from "./DashHeader";

function DashboardLayout({ children, ...rest }) {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className={`${styles["container"]}`}>
      <SideBar isOpen={openSideBar} onSetOpenSideBar={setOpenSideBar} />
      <div className={`${styles["content-container"]}`}>
        <DashHeader onSetOpenSideBar={setOpenSideBar} />
        <Route path="/" render={(props) => <DashboardHome />} />
      </div>
    </div>
  );
}

export { DashboardLayout };
