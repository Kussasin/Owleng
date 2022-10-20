import React from "react";
import { Link } from "react-router-dom";
import styles from "./choiceLevel.module.scss";
import CustomButton from "../../UI/CustomButton/CustomButton";

function ChoiceLevel() {
  return (
    <div className={styles.choice_level_container}>
      <div className={styles.form_container}>
        <p>Wybierz swój poziom</p>
        <div className={styles.buttons_container}>
          <div className={styles.grid_container}>
            <Link to="/">
              <CustomButton
                title="A1"
                additionalStyles={styles.button_style}
                onPress={() => {
                  console.log("text");
                }}
              />
            </Link>
            <Link to="/">
              <CustomButton title="A2" additionalStyles={styles.button_style} />
            </Link>
            <Link to="/">
              <CustomButton title="B1" additionalStyles={styles.button_style} />
            </Link>
            <Link to="/">
              <CustomButton title="B2" additionalStyles={styles.button_style} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
export default ChoiceLevel;
