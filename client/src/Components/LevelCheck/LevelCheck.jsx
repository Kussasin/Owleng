import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./levelCheck.module.css";
import CustomButton from "../UI/CustomButton/CustomButton";
//import ChoiceLevel from "../ChoiceLevel/ChoiceLevel";

function LevelCheck() {
  return (
    <div className={styles.level_check_container}>
      <div className={styles.form_container}>
        <p className={styles.title}>Czy wiesz swój poziom języka?</p>
        <NavLink to="/ChoiceLevel">
          <CustomButton
            title="Wiem, jaki mam poziom"
            additionalStyles={styles.button_style}
            onPress={() => {
              console.log("text");
            }}
          />
        </NavLink>
        <NavLink to="">
          <CustomButton
            title="Tylko zaczynam naukę"
            additionalStyles={styles.button_style}
          />
        </NavLink>
        <NavLink to="/levelTest">
          <CustomButton
            title="Chcę przetestować swoja wiedzę"
            additionalStyles={styles.button_style}
          />
        </NavLink>
      </div>
    </div>
  );
}
export default LevelCheck;
