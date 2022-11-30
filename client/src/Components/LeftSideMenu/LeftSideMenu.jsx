import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Dropdown from "../../img/HeaderImg/Dropdown_arrow.png";
import styles from "./leftSideMenu.module.scss";

const LeftSideMenu = (props) => {
  const [themeIndex, setThemeIndex] = useState();
  const [subIndex, setSubThemeIndex] = useState();
  const [isActive, setIsActive] = useState();
  let id = 0;
  let themeId = 0;
  const ref = useRef();

  function Toggle(index) {
    return () => setThemeIndex(index);
  }
  function SubToggle(index) {
    return () => setSubThemeIndex(index);
  }

  function Toggling() {
    return () => setIsActive((current) => !current);
  }

  return (
    <div className={styles.container_content_left}>
      <div className={styles.container_dropdown}>
        {props.title.map((element, index) => {
          const titleIndex = index;
          themeId++;
          return (
            <div key={index} onClick={Toggle(themeId)}>
              <div
                className={styles.dropdown}
                onClick={Toggling()}
                ref={ref}
                role="button"
                tabIndex={0}
                aria-hidden="true"
              >
                <p className={styles.dropdown_text}>{element.theme}</p>
                <img
                  className={`${styles.dropdown_arrow} ${
                    themeIndex === themeId
                      ? isActive
                        ? styles.rotate_arrow_180
                        : ""
                      : ""
                  }`}
                  src={Dropdown}
                  alt="dropdown arrow"
                />
              </div>
              <div
                className={`${styles.dropdown_container} ${
                  themeIndex === themeId
                    ? isActive
                      ? styles.show
                      : styles.hide
                    : styles.hide
                }`}
              >
                <div className={styles.dropdown_item}>
                  {element.subt.map((subtheme, index) => {
                    id++;
                    return (
                      <p
                        onClick={() => {
                          // ustawienie stanu testu na poczatkowy
                          props.setSelectedThemeId(index);
                          props.setselectedTopicId(titleIndex);
                          props.setTestActive(false);
                          props.setCurrentQuestionIndex(0);
                          props.setUserScore(0);
                          props.setCurrentCorrectAnswerId(-1);
                          props.setSelectedAnswerId(undefined);
                          props.setisFisrtElement(true);
                        }}
                        className={`${styles.dropdown_item_element} ${
                          subIndex === id ? styles.isActive : ""
                        }`}
                        key={index}
                      >
                        <span
                          onClick={SubToggle(id)}
                          className={styles.dropdown_item_element_text}
                        >
                          {subtheme}
                        </span>
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
  setCurrentCorrectAnswerId: PropTypes.func,
  setSelectedAnswerId: PropTypes.func,
  setisFisrtElement: PropTypes.func
};

export default LeftSideMenu;
