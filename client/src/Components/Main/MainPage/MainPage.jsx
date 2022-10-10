import React from "react";
import { Link } from "react-router-dom";
import styles from "./mainPage.module.scss";
import Header from "../Header/Header";
import MobileHeader from "../Header/MobileHeader/MobileHeader";
import Gramatyka from "../../../img/MainImg/Gramatyka.png"
import Czytanie from "../../../img/MainImg/Czytanie.png"
import Testy from "../../../img/MainImg/Testy.png"
import Słuchanie from "../../../img/MainImg/Słuchanie.png"
import Wideo_materiały from "../../../img/MainImg/Wideo_materiały.png"
import Mówienie from "../../../img/MainImg/Mówienie.png"
import Arrow from "../../../img/MainImg/arrow.png"
import ActiveArrow from "../../../img/MainImg/arrowactive.png"


function SquareButton(name, url, linkTo) {
  return (
    <Link className={styles.link_button} to={linkTo} key={name}>
      <div className={styles.button_container}>
        <h3 className={styles.button_container_title}>{name}</h3>
        <img className={styles.button_container_image} src={url} alt={name} />
        <div className={styles.button_container_arrow}>
          <img className={styles.arrow_disable} src={Arrow} alt="arrow" />
          <img className={styles.arrow_active} src={ActiveArrow} alt="arrow" />
        </div>
      </div>
    </Link>
  );
}

function MainPage() {
  const buttonData = [
    { url: Gramatyka, title: "Gramatyka", link: "/" },
    { url: Czytanie, title: "Czytanie", link: "/" },
    { url: Testy, title: "Testy", link: "/" },
    { url: Słuchanie, title: "Słuchanie", link: "/" },
    { url: Wideo_materiały, title: "Wideo Materiały", link: "/video" },
    { url: Mówienie, title: "Mówienie", link: "/" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <Header />
        <MobileHeader />
      </div>
      <div className={styles.container_content}>
        {buttonData.map((item) =>
          SquareButton(item.title, item.url, item.link)
        )}
      </div>
    </div>
  );
}

export default MainPage;
