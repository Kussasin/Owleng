import React from "react";
import PropTypes from "prop-types";
import styles from "./customButton.module.css";

const CustomButton = (props) => {
  return (
    <button
      type={props.type}
      className={`${styles.custom_button} ${props.additionalStyles}`}
      onClick={props.onPress}
    >
      {props.title}
    </button>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  additionalStyles: PropTypes.object,
  onPress: PropTypes.func,
};

export default CustomButton;
