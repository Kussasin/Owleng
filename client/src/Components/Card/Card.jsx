import React from "react";
import styles from "./card.module.css";
import PropTypes from "prop-types";

function Card(props) {
  return (
    <div className={`${styles.card} ${props.additionalStyles}`}>
      {props.children}
    </div>
  );
}
Card.propTypes = {
  additionalStyles: PropTypes.object,
  children: PropTypes.element,
};
export default Card;
