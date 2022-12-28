import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from "./mobileheader.module.scss";
import { auth } from "../../../utils/firebaseConfig";
import { useAuth } from "../../Registration/AuthContext/AuthContext";
import { getDatabase, ref as firebaseRef, child, get } from "firebase/database";

import DarkModeToggle from "react-dark-mode-toggle";
import Cross from "../../../img/HeaderImg/Cross.png"
import Burger from "../../../img/HeaderImg/Burger.png"

function NavItem(title, link) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout(auth);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  }
  return title !== "Wyloguj się" ? (
    <Link className={styles.burger_menu_item} to={link} key={title}>
      <p>{title}</p>
    </Link>
  ) : (
      <Link
        className={styles.burger_menu_item}
        to={link}
        key={title}
        onClick={handleLogout}
      >
        <p>{title}</p>
      </Link>
    );
}

function MobileHeader() {
  const [userLevel, setUserLevel] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('Theme') != null ? "true" === localStorage.getItem('Theme') : false);
  const NavItemsOver = [
    { title: "Ustawenia", link: "/settings" },
    { title: "O Nas", link: "/aboutus" },
  ];
  const NavItemsUnder = [
    { title: "Wyloguj się", link: "/login" },
  ];

  useEffect(() => {
    const dbRef = firebaseRef(getDatabase());
    const userId = auth.currentUser.uid;
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userInfo = snapshot.val();
          setUserLevel(userInfo.level);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('Theme', isDarkMode);
    window.dispatchEvent(new Event("storage"));
  }, [isDarkMode]);

  function Toggling() {
    return setIsActive((current) => !current);
  }

  if (isActive) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return (
    <nav className={`${styles.header} ${isDarkMode ? styles.darkTheme : styles.lightTheme}`}>
      <div className={styles.header_container}>
        <Link to="/">
          <h1>Owleng</h1>
        </Link>
        <div className={styles.user_level}>
          <p>Twój poziom: </p>
          <span className={styles.current_user_level}>{userLevel}</span>
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
                  <DarkModeToggle
                    onChange={setIsDarkMode}
                    checked={isDarkMode}
                    size={58}
                    className={styles.darkmodetoggle}
                  />
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
