import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./choiceLevel.module.scss";
import { auth, database } from "../../../utils/firebaseConfig";
import { ref, update } from "firebase/database";
import PropTypes from "prop-types";

import CustomButton from "../../UI/CustomButton/CustomButton";

function ChoiceLevel({ isDarkTheme }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const onConfirmLevel = (selectedLevel) => {
    const userId = auth.currentUser.uid;
    const userEmail = auth.currentUser.email;
    const updates = {};
    updates[`/users/${userId}`] = { email: userEmail, level: selectedLevel };
    update(ref(database), updates)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  };

  return (
    <div className={`${styles.choice_level_container} ${isDarkTheme ? styles.darkTheme : styles.lightTheme}`}>
      {isSuccess && <Navigate to="/" replace={true} />}
      <div className={styles.form_container}>
        <p>Wybierz swój poziom</p>
        <div className={styles.buttons_container}>
          <div className={styles.grid_container}>
            <CustomButton
              title="A1"
              additionalStyles={styles.button_style}
              onPress={() => onConfirmLevel("A1")}
            />
            <CustomButton
              title="A2"
              additionalStyles={styles.button_style}
              onPress={() => onConfirmLevel("A2")}
            />
            <CustomButton
              title="B1"
              additionalStyles={styles.button_style}
              onPress={() => onConfirmLevel("B1")}
            />
            <CustomButton
              title="B2"
              additionalStyles={styles.button_style}
              onPress={() => onConfirmLevel("B2")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ChoiceLevel.propTypes = {
  isDarkTheme: PropTypes.bool
}

export default ChoiceLevel;
