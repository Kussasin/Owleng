import React from "react";
import styles from "./listening.module.scss";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import Test from "./test.mp3";
import Button from "../UI/CustomButton/CustomButton";

function Listening() {
  const Theme = [
    { theme: "Temat 1", subt: ["podtemat 1", "podtemat 2", "podtemat 3"] },
    { theme: "Temat 2", subt: ["podtemat 1", "podtemat 2"] },
    { theme: "Temat 3", subt: ["podtemat 1"] }
  ];
  const Answers = [
    "Lorem", "Ipsum", "Hello", "Bye"
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
          <audio src={Test} controls />
          <p className={styles.container_content_right_title}>
            Wybierz poprawną odpowiedź:
          </p>
          <div className={styles.container_content_right_content}>
            <div className={styles.content}>
              <p className={styles.content_text}>{"Loremesrdtfyvgbuhinjmoknhubgyvftcdrsexdrcfvgbh"}</p>
            </div>
          </div>
          <div className={styles.answers}>
            {Answers.map((answer) => 
              <Button
                key={answer}
                title={answer}
                additionalStyles={styles.button_style}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listening;
