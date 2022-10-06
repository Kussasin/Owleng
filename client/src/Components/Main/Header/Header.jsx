import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import Moon from '../../../img/HeaderImg/Moon.png';
import Dropdown from '../../../img/HeaderImg/Dropdown_arrow.png';
import People from '../../../img/HeaderImg/People.png';
import Bell from '../../../img/HeaderImg/Bell.png';
import Star from '../../../img/HeaderImg/Star.png';
import ToggleButton from './ToggleButton/ToggleButton';

function Header() {
  const poziom = 'B1';
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

    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isActive]);

  return (
    <nav className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_left}>
          <Link to="/">
            <h1>Owleng</h1>
          </Link>
          <div className={styles.theme_control}>
            <img className={styles.theme_control_icon} src={Moon} alt="theme_icon" />
            <ToggleButton
              selected={selected}
              toggleSelected={() => {
                setSelected(!selected);
              }}
            />
          </div>
          <div className={styles.user_level}>
            <p>Twój poziom: </p>
            <span className={styles.current_user_level}>{poziom}</span>
          </div>
        </div>
        <div className={styles.header_right}>
          <img className={styles.notification} src={Bell} alt="notifications" />
          <img className={styles.favorite} src={Star} alt="favorite words" />
          <div className={styles.dropdown} onClick={Toggling} ref={ref} role="button" tabIndex={0} aria-hidden="true">
            <img className={styles.dropdown_icon} src={People} alt="man icon" />
            <img className={`${styles.dropdown_arrow} ${isActive ? styles.rotate_arrow_180 : ''}`} src={Dropdown} alt="dropdown arrow" />
            <div className={`${styles.dropdown_container} ${isActive ? styles.show : styles.hide}`}>
              <a className={styles.container_item} href="#home">Ustawenia</a>
              <a className={styles.container_item} href="#about">Pomoc</a>
              <a className={styles.container_item} href="#contact">O nas</a>
              <a className={styles.container_item} href="#contact">Wyloguj się</a>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
