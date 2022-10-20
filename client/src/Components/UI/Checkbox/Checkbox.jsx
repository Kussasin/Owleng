import React from "react";
import PropTypes from "prop-types";
import styles from "./checkbox.module.scss";

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label className={styles.sort_and_filter}>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className={styles.checkbox}
      />
      {label}
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
