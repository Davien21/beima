import React from "react";
import { Route } from "react-router-dom";
import { LandingPage } from "../../pages";
import styles from "./main-layout.module.css";
import { MainHeader } from "./MainHeader";

function MainLayout({ children, ...rest }) {
  return (
    <div className={`${styles["container"]}`}>
      <MainHeader />
      <Route path="/" render={(props) => <LandingPage />} />
    </div>
  );
}

export { MainLayout };
