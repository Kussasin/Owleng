import React from "react";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import styles from "../Settings/settings.module.scss";
import CustomButton from "../UI/CustomButton/CustomButton";

function Settings() {
  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      <div className={styles.container_content}>
        <div className={styles.container_settings}>
          <h1>
            <center>Ustawienia</center>
          </h1>
          <p className={styles.change_password}>
            Proszę wpisać aktualne hasło:
            <input></input>
            Proszę wpisać nowe hasło:
            <input></input>
            <CustomButton
              title="Zmień"
              additionalStyles={styles.edit_password}
            ></CustomButton>
          </p>
          <br />
          <p className={styles.edit_info}>
            <input></input>
          </p>
          <p className={styles.edit_photo}></p>
        </div>
      </div>
    </div>
  );
}
export default Settings;
