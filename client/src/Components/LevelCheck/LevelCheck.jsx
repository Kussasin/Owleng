import React from "react";
//import { Link } from "react-router-dom";
import styles from "./levelCheck.module.css";
import CustomButton from "../UI/CustomButton/CustomButton";

function LevelCheck() {
  return (
    <div className={styles.level_check_container}>
      <div className={styles.form_container}>
        <p className={styles.title}>Czy wiesz swój poziom języka?</p>
        <CustomButton
          title="Wiem, jaki mam poziom"
          additionalStyles={styles.button_style}
          onPress={() => {
            console.log("text");
          }}
        />
        <CustomButton
          title="Tylko zaczynam naukę"
          additionalStyles={styles.button_style}
        />
        <CustomButton
          title="Chcę przetestować swoja wiedzę"
          additionalStyles={styles.button_style}
        />
        <CustomButton title="B1" />
      </div>
    </div>
  );
}
export default LevelCheck;
