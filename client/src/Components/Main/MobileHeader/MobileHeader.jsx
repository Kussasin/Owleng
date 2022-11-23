import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Burger from "../../../img/HeaderImg/Burger.png"
import Cross from "../../../img/HeaderImg/Cross.png"
import styles from "./mobileheader.module.scss";
import ToggleButton from '../Header/ToggleButton/ToggleButton';

function NavItem(name, link) {
  return (
    <Link className={styles.burger_menu_item} to={link} key={name}>
      <p>{name}</p>
    </Link>
  );
}

function MobileHeader() {
  const poziom = 'B1';
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(false);
  const NavItemsOver = [
    { title: "Ustawenia", link: "/settings" },
    { title: "O Nas", link: "/aboutus" },
  ];
  const NavItemsUnder = [
    { title: "Wyloguj się", link: "/login" },
  ];

  function Toggling() {
    return setIsActive((current) => !current);
  }

  if (isActive) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return (
    <nav className={styles.header}>
      <div className={styles.header_container}>
        <Link to="/">
          <h1>Owleng</h1>
        </Link>
        <div className={styles.user_level}>
          <p>Twój poziom: </p>
          <span className={styles.current_user_level}>{poziom}</span>
        </div>
        <div>
          <img className={styles.burger_icon} src={Burger} alt="burger"
            onClick={Toggling} role="button" tabIndex={0} aria-hidden="true" />
          <div className={`${isActive ? styles.background_blur : ''}`} />
          <div className={`${styles.burger_menu} ${isActive ? '' : styles.menu_disable}`}>
            <div className={styles.burger_menu_container}>
              <div className={styles.burger_items}>
                <div className={styles.burger_icon_container} onClick={Toggling} role="button" tabIndex={0} aria-hidden="true" >
                  <img className={styles.burger_icon_cross} src={Cross} alt="close_cross" />
                </div>
                {NavItemsOver.map((item) =>
                  NavItem(item.title, item.link)
                )}
                <div className={styles.change_theme}>
                  <p>Motyw</p>
                  <ToggleButton selected={selected} toggleSelected={() => { setSelected(!selected); }} />
                </div>
                {NavItemsUnder.map((item) =>
                  NavItem(item.title, item.link)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MobileHeader;
