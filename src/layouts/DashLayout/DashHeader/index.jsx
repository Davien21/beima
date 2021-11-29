import React from "react";
import { MenuIcon, userSvg } from "../../../assets/svg";
import styles from "./dash-header.module.css";

function DashHeader({ onSetOpenSideBar }) {
  return (
    <header
      className={`container ${styles.container} flex items-center py-4 text-white`}
    >
      <MenuIcon onClick={() => onSetOpenSideBar(true)} className="md:hidden" />
      <div className="ml-auto flex items-center">
        <img src={userSvg} alt="user" />
        <span className="ml-3">
          <strong>Atoms</strong> Kruft
        </span>
      </div>
    </header>
  );
}

export { DashHeader };
