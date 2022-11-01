import React from "react";
import styles from "./listening.module.scss";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";

function Listening() {
  const Theme = [
    { theme: "Temat 1", subt: ["podtemat 1", "podtemat 2", "podtemat 3"] },
    { theme: "Temat 2", subt: ["podtemat 1", "podtemat 2"] },
    { theme: "Temat 3", subt: ["podtemat 1"] },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      <div className={styles.container_content}>
        <LeftSideMenu title={Theme} />
        <div className={styles.container_content_right}>
          <p className={styles.container_content_right_title}>
            Wybierz poprawną odpowiedź:
          </p>
          <div className={styles.container_content_right_content}>
            <div className={styles.content}>
              <p className={styles.content_text}>{"Loremesrdtfyvgbuhinjmoknhubgyvftcdrsexdrcfvgbh"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listening;
