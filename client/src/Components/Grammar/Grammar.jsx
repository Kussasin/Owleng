import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./grammar.module.scss";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import Dropdown from "../../img/HeaderImg/Dropdown_arrow.png";

function MainPage() {
  const linkTo = "#";
  const Subtopic = "Podtemat 1";
  const Topic = "Temat 1";
  const [isActive, setIsActive] = useState(false);
  function Toggling() {
    return setIsActive((current) => !current);
  }
  const ref = useRef();
  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader/>
        <Header />
      </div>
      <div className={styles.container_content}>
        <div className={styles.container_content_left}>
          <div className={styles.container_dropdown}>
            <div
              className={styles.dropdown}
              onClick={Toggling}
              ref={ref}
              role="button"
              tabIndex={0}
              aria-hidden="true"
            >
              <p className={styles.dropdown_text}>{Topic}</p>
              <img
                className={`${styles.dropdown_arrow} ${
                  isActive ? styles.rotate_arrow_180 : ""
                }`}
                src={Dropdown}
                alt="dropdown arrow"
              />
            </div>
            <div
              className={`${styles.dropdown_container} ${
                isActive ? styles.show : styles.hide
              }`}
            >
              <div className={styles.dropdown_item}>
                <p className={styles.dropdown_item_text}>{Subtopic}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_content_right}>
          <div className={styles.content}>
            <p>a</p>
          </div>
          <div className={styles.content_button}>
            <Link to={linkTo}>
              <button type="submit" className={styles.button}>
                Przejdź do testu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
