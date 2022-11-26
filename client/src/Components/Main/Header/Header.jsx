import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import Dropdown from "../../../img/HeaderImg/Dropdown_arrow.png";
import People from "../../../img/HeaderImg/People.png";
import ToggleButton from "./ToggleButton/ToggleButton";
import { auth } from "../../../utils/firebaseConfig";
import { useAuth } from "../../Registration/AuthContext/AuthContext";


function DropdownItem(title, link) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {

    try {
      await logout(auth);
      navigate('/login');

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    title !== "Wyloguj się" ?
      <Link className={styles.container_item} to={link} key={title}>
        <p>{title}</p>
      </Link> :
      <Link className={styles.container_item} to={link} key={title} onClick={handleLogout}>
        <p>{title}</p>
      </Link>
  );
}

function Header() {
  const poziom = "B1";
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(false);

  function Toggling() {
    return setIsActive((current) => !current);
  }

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive]);

  const DropdownItems = [
    { title: "Ustawenia", link: "/settings" },
    { title: "O nas", link: "/aboutus" },
    { title: "Wyloguj się", link: "/login" },
  ];

  return (
    <nav className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_left}>
          <Link to="/">
            <h1>Owleng</h1>
          </Link>
          <ToggleButton
            selected={selected}
            toggleSelected={() => {
              setSelected(!selected);
            }}
          />
          <div className={styles.user_level}>
            <p>Twój poziom: </p>
            <span className={styles.current_user_level}>{poziom}</span>
          </div>
        </div>
        <div className={styles.header_right}>
          <div
            className={styles.dropdown}
            onClick={Toggling}
            ref={ref}
            role="button"
            tabIndex={0}
            aria-hidden="true"
          >
            <img className={styles.dropdown_icon} src={People} alt="man icon" />
            <img
              className={`${styles.dropdown_arrow} ${isActive ? styles.rotate_arrow_180 : ""
                }`}
              src={Dropdown}
              alt="dropdown arrow"
            />
            <div
              className={`${styles.dropdown_container} ${isActive ? styles.show : styles.hide
                }`}
            >
              {DropdownItems.map((item) => DropdownItem(item.title, item.link))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
