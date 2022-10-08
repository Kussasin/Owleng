import React from 'react';
import Burger from "../../../../img/HeaderImg/Burger.png"
import Cross from "../../../../img/HeaderImg/Cross.png"

function MobileHeader() {

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
        <img className={styles.burger_menu} src={Burger} alt="burger" />
        <div className={styles.burger_items}>
          <img className={styles.burger_menu} src={Cross} alt="close_cross" />
          <a href="#">Mój profil</a>
          <a href="#">Powiadomienia</a>
          <a href="#">Ulubione</a>
          <div className={styles.change_theme}>
            <a href="#">Motyw</a>
          </div>
          <a href="#">Ustawenia</a>
          <a href="#">Pomoc</a>
          <a href="#">O Nas</a>
          <a href="#">Wyloguj się</a>
        </div>
      </div>
    </nav>
  );
}

export default MobileHeader;
