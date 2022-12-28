import React from "react";
import { NavLink } from "react-router-dom";
import { database, auth } from "../../../utils/firebaseConfig";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./levelCheck.module.scss";
import PropTypes from "prop-types";

import CustomButton from "../../UI/CustomButton/CustomButton";

function LevelCheck({ isDarkTheme }) {
  const [user] = useAuthState(auth);

  try {
    set(ref(database, "users/" + user.uid), {
      email: user.email,
      level: "A0",
    });
  } catch (error) {
    console.log(error.message);
  }

  return (
    <div className={`${styles.level_check_container} ${isDarkTheme ? styles.darkTheme : styles.lightTheme}`}>
      <div className={styles.form_container}>
        <p className={styles.form_container_h1}>
          Czy wiesz swój poziom języka?
        </p>
        <div className={styles.check_level}>
          <NavLink to="/ChoiceLevel" className={styles.link_container}>
            <CustomButton
              title="Wiem, jaki mam poziom"
              additionalStyles={styles.button_style}
              onPress={() => { }}
            />
          </NavLink>
          <NavLink to="/" className={styles.link_container}>
            <CustomButton
              title="Tylko zaczynam naukę"
              additionalStyles={styles.button_style}
            />
          </NavLink>
          <NavLink to="/levelTest" className={styles.link_container}>
            <CustomButton
              title="Chcę przetestować swoja wiedzę"
              additionalStyles={styles.button_style}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

LevelCheck.propTypes = {
  isDarkTheme: PropTypes.bool
}

export default LevelCheck;
