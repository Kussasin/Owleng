import React from "react";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import styles from "../AboutUs/aboutUs.module.scss";
import photo_yp from "./images/YuliiaPrysiazhna.jpg";
import photo_db from "./images/DaryaBenedziktovich.jpg";
import photo_bb from "./images/BogdanBasistyi.jpeg";

function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      <div className={styles.container_content}>
        <div className={styles.container_info}>
          <h1>
            <center>O nas</center>
          </h1>
          <p className={styles.info_about_owleng}>
            <b>Owleng</b> - interaktywna aplikacja internetowa do nauki języka
            angielskiego <br />
            <br />
            Aplikacja Owleng pozwala na kompleksową naukę języka angielskiego,
            za pomocą takich rozdziałów jak:
            <li>
              <b>Czytanie</b> - blok z tekstami do czytania
            </li>
            <li>
              <b>Gramatyka</b> - blok z regułami do pisania
            </li>
            <li>
              <b>Słuchanie</b> - blok z audiościeżkami do słuchania
            </li>
            <li>
              <b>Wideo materiały</b> - blok z wideo materiałami z różnymi
              tematami
            </li>
            <li>
              <b>Mówienie</b> - blok, w którym jest możlisość sprawdzenia
              poprawności mówienia
            </li>
            <li>
              <b>Testy</b> - blok z testami na gramatykę, słownictwo, główny
              test na poziom znajomości języka oraz inne.
            </li>
          </p>
          <h1>
            <center>Autorzy</center>
          </h1>
        </div>
        <div className={styles.grid_autors}>
          <div className={styles.autors}>
            <img className={styles.autors_container_image} src={photo_yp} />
            <center>
              <p>
                <b>Yuliia Prysiazhna</b>
              </p>
            </center>
          </div>
          <div className={styles.autors}>
            <img className={styles.autors_container_image} src={photo_db} />
            <center>
              <p>
                <b>Darya Benedziktovich</b>
              </p>
            </center>
          </div>
          <div className={styles.autors}>
            <img className={styles.autors_container_image} src={photo_bb} />
            <center>
              <p>
                <b>Bogdan Basistyi</b>
              </p>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
