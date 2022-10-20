import React from "react";
import PropTypes from "prop-types";
import styles from "./radiobox.module.scss";

const Radiobox = ({ label, value, onChange }) => {
  return (
    <label>
      <input
        type="radio"
        value={value}
        checked={value}
        onChange={onChange}
        className={styles.radiobox}
      />
      {label}
    </label>
  );
};
Radiobox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Radiobox;
