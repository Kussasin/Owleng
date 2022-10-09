import React from "react";
import styles from "./choiceLevel.module.scss";
import CustomButton from "../../UI/CustomButton/CustomButton";

function ChoiceLevel() {
  return (
    <div className={styles.choice_level_container}>
      <div className={styles.form_container}>
        <p>Wybierz swój poziom</p>
        <div className={styles.grid_container}>
          <CustomButton
            title="A1"
            additionalStyles={styles.button_style}
            onPress={() => {
              console.log("text");
            }}
          />
          <CustomButton title="A2" additionalStyles={styles.button_style} />
          <CustomButton title="B1" additionalStyles={styles.button_style} />
          <CustomButton title="B2" additionalStyles={styles.button_style} />
        </div>
      </div>
    </div>
  );
}
export default ChoiceLevel;
