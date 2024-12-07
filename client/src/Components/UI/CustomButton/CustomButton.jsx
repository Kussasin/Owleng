import React from "react";
import PropTypes from "prop-types";
import styles from "./customButton.module.scss";

const CustomButton = (props) => {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      className={`${styles.custom_button} ${props.additionalStyles}`}
      onClick={props.onPress}
    >
      <span>{props.title}</span>
    </button>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  additionalStyles: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CustomButton;
