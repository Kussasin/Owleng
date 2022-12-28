import React from "react";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import styles from "../AboutUs/aboutUs.module.scss";
import PropTypes from "prop-types";

import photo_yp from "./images/YuliiaPrysiazhna.jpg";
import photo_db from "./images/DaryaBenedziktovich.jpg";
import photo_bb from "./images/BogdanBasistyi.jpeg";

function AboutUs({ isDarkTheme }) {
  return (
    <div className={`${styles.container} ${isDarkTheme ? styles.darkTheme : styles.lightTheme}`}>
      <MobileHeader />
      <Header />
      <div className={styles.container_content}>
        <div className={styles.container_info}>
          <h1>
            <center>O nas</center>
          </h1>
          <div className={styles.info_about_owleng}>
            <p>
              {" "}
              <b>Owleng</b> &mdash;&nbsp;interaktywna aplikacja internetowa
              do&nbsp;nauki języka angielskiego
            </p>
            <p>
              Aplikacja Owleng pozwala na&nbsp;kompleksową naukę języka
              angielskiego, za&nbsp;pomocą takich rozdział&oacute;w jak:
            </p>
            <li>
              <b>Czytanie</b> &mdash;&nbsp;blok z&nbsp;tekstami do&nbsp;czytania
            </li>
            <li>
              <b>Gramatyka</b> &mdash;&nbsp;blok z&nbsp;regułami do&nbsp;pisania
            </li>
            <li>
              <b>Słuchanie</b> &mdash;&nbsp;blok z&nbsp;audiościeżkami
              do&nbsp;słuchania
            </li>
            <li>
              <b>Wideo materiały</b> &mdash;&nbsp;blok z&nbsp;wideo materiałami
              z&nbsp;r&oacute;żnymi tematami
            </li>
            <li>
              <b>Mówienie</b> &mdash;&nbsp;blok, w&nbsp;kt&oacute;rym jest
              możlisość sprawdzenia poprawności m&oacute;wienia
            </li>
            <li>
              <b>Testy</b> &mdash;&nbsp;blok z&nbsp;testami na&nbsp;gramatykę,
              słownictwo, gł&oacute;wny test na&nbsp;poziom znajomości języka
              oraz inne.
            </li>
          </div>
          <h1>
            <center>Autorzy</center>
          </h1>
        </div>
        <div className={styles.grid_autors}>
          <div className={styles.autors}>
            <a
              href="https://www.linkedin.com/in/yuliia-prysiazhna-577277259/"
              target="_blank"
              rel="noreferrer"
            >
              <img className={styles.autors_container_image} src={photo_yp} />
            </a>
            <center>
              <p>
                <b>Yuliia Prysiazhna</b>
              </p>
            </center>
          </div>
          <div className={styles.autors}>
            <a
              href="https://www.linkedin.com/in/daria-benediktowicz-a18973212/"
              target="_blank"
              rel="noreferrer"
            >
              <img className={styles.autors_container_image} src={photo_db} />
            </a>
            <center>
              <p>
                <b>Darya Benedziktovich</b>
              </p>
            </center>
          </div>
          <div className={styles.autors}>
            <a
              href="https://www.linkedin.com/in/bogdan-basisty-65b494212/"
              target="_blank"
              rel="noreferrer"
            >
              <img className={styles.autors_container_image} src={photo_bb} />
            </a>
            <center>
              <p>
                <b>Bogdan Basisty</b>
              </p>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

AboutUs.propTypes = {
  isDarkTheme: PropTypes.bool
}

export default AboutUs;
