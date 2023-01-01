import React from "react";
import { Link } from "react-router-dom";
import styles from "./mainPage.module.scss";
import PropTypes from "prop-types";

import Header from "../Header/Header";
import MobileHeader from "../MobileHeader/MobileHeader";
import Gramatyka from "../../../img/MainImg/Gramatyka.png";
import Czytanie from "../../../img/MainImg/Czytanie.png";
import Testy from "../../../img/MainImg/Testy.png";
import Słuchanie from "../../../img/MainImg/Słuchanie.png";
import Wideo_materiały from "../../../img/MainImg/Wideo_materiały.png";
import Mówienie from "../../../img/MainImg/Mówienie.png";
import DarkArrow from "../../../img/MainImg/dark_disabled.png";
import DarkActiveArrow from "../../../img/MainImg/dark_active.png";
import Arrow from "../../../img/MainImg/arrow.png";
import ActiveArrow from "../../../img/MainImg/arrowactive.png";

function SquareButton(name, url, linkTo, isDark) {
  return (
    <Link className={styles.link_button} to={linkTo} key={name}>
      <div className={styles.button_container}>
        <h3 className={styles.button_container_title}>{name}</h3>
        <img className={styles.button_container_image} src={url} alt={name} />
        <div className={styles.button_container_arrow}>
          <img
            className={styles.arrow_disable}
            src={isDark ? DarkArrow : Arrow}
            alt="arrow"
          />
          <img
            className={styles.arrow_active}
            src={isDark ? DarkActiveArrow : ActiveArrow}
            alt="arrow"
          />
        </div>
      </div>
    </Link>
  );
}

function MainPage({ isDarkTheme }) {
  const buttonData = [
    { url: Gramatyka, title: "Gramatyka", link: "/grammar" },
    { url: Czytanie, title: "Czytanie", link: "/reading" },
    { url: Testy, title: "Testy", link: "/tests" },
    { url: Słuchanie, title: "Słuchanie", link: "/listening" },
    { url: Wideo_materiały, title: "Materiały wideo", link: "/video" },
    { url: Mówienie, title: "Mówienie", link: "/speaking" },
  ];

  return (
    <div
      className={`${styles.container} ${
        isDarkTheme ? styles.darkTheme : styles.lightTheme
      }`}
    >
      <div className={styles.container_header}>
        <Header />
        <MobileHeader />
      </div>
      <div className={styles.container_content}>
        {buttonData.map((item) =>
          SquareButton(item.title, item.url, item.link, isDarkTheme)
        )}
      </div>
    </div>
  );
}

MainPage.propTypes = {
  isDarkTheme: PropTypes.bool,
};

export default MainPage;
