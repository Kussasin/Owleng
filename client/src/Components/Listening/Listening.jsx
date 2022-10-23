import React from "react";
import styles from "./listening.module.scss";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";

function Listening() {
  
  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      <div className={styles.container_content}>
        <LeftSideMenu />
        <div className={styles.container_content_right}>
          <div className={styles.container_content_right_content}>
          </div>
       </div>
      </div>
    </div>
  );
}

export default Listening;
