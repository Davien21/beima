import React from "react";
import { BeimaLogo } from "../../../assets/svg";
import styles from "./main-header.module.css";

function MainHeader(props) {
  return (
    <header
      className={`container ${styles.container} flex items-center py-4 text-white`}
    >
      <div className="flex items-end">
        <BeimaLogo className={`${styles.logo}`} />
        <span className="ml-3 text-2xl">Beima</span>
      </div>
    </header>
  );
}

export { MainHeader };
