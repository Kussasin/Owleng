import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Dropdown from "../../img/HeaderImg/Dropdown_arrow.png";
import styles from "./leftSideMenu.module.scss";

const LeftSideMenu = (props) => {
  const [isActive, setIsActive] = useState(false);
  function Toggle(index) {
    return () => setIsActive(index);
  }
  const ref = useRef();
  return (
    <div className={styles.container_content_left}>
      <div className={styles.container_dropdown}>
        {props.title.map((element, index) => {
          const titleIndex = index;
          return (
            <div key={index}>
              <div
                className={styles.dropdown}
                onClick={Toggle(index)}
                ref={ref}
                role="button"
                tabIndex={0}
                aria-hidden="true"
              >
                <p className={styles.dropdown_text}>{element.theme}</p>
                <img
                  className={`${styles.dropdown_arrow} ${
                    isActive === index
                      ? ref.current.classList.contains(styles.rotate_arrow_180)
                        ? ""
                        : styles.rotate_arrow_180
                      : ""
                  }`}
                  src={Dropdown}
                  alt="dropdown arrow"
                />
              </div>
              <div
                className={`${styles.dropdown_container} ${
                  isActive === index ? styles.show : styles.hide
                }`}
              >
                <div className={styles.dropdown_item}>
                  {element.subt.map((subtheme, index) => {
                    return (
                      <p
                        onClick={() => {
                          props.setSelectedThemeId(index);
                          props.setselectedTopicId(titleIndex);
                          props.setTestActive(false);
                          props.setCurrentQuestionIndex(0);
                          props.setUserScore(0);
                        }}
                        className={styles.dropdown_item_text}
                        key={index}
                      >
                        {subtheme}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

LeftSideMenu.propTypes = {
  props: PropTypes.array,
  title: PropTypes.array,
  setSelectedThemeId: PropTypes.func,
  setselectedTopicId: PropTypes.func,
  setTestActive: PropTypes.func,
  setCurrentQuestionIndex: PropTypes.func,
  setUserScore: PropTypes.func,
};

export default LeftSideMenu;
