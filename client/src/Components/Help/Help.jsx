import React from "react";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import styles from "../Help/help.module.scss";

function Help() {
  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      <div className={styles.container_content}>
        <div className={styles.container_help}>
          <h1>
            <center>Pomóc</center>
          </h1>
        </div>
      </div>
    </div>
  );
}
export default Help;
