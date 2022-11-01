import React, { useState, useEffect, useRef } from "react";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import styles from "./FAQ.module.scss";
import Dropdown from "../../img/HeaderImg/Dropdown_arrow.png";

function FAQ() {
  const [isActive, setIsActive] = useState(false);
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
  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      <div className={styles.container_content}>
        <div className={styles.container_faq}>
          <h1>
            <center>FAQ</center>
          </h1>
          <div className={styles.questions}>
            <div className={styles.dropdown} onClick={Toggling} ref={ref} role="button" tabIndex={0} aria-hidden="true">
              <center>
                <p>
                  <b>Lorem ipsum dolor sit amet consectetur, adipisicing elit?</b>
                </p>
              </center>
              <img className={`${styles.dropdown_arrow} ${
                  isActive ? styles.rotate_arrow_180 : "" }`}
                  src={Dropdown}
                  alt="dropdown arrow"
              />
            </div>
            <div className={`${styles.dropdown_container} ${ isActive ? styles.show : styles.hide }`} >
                <div className="{styles.container_item}">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis enim nam quam non quidem libero incidunt, adipisci laborum cum molestiae cumque consequatur maiores optio modi officiis eius esse possimus obcaecati.
                </p>
                </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default FAQ;
