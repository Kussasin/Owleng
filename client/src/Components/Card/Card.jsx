import React from "react";
import styles from "./card.module.scss";
import PropTypes from "prop-types";

function Card(props) {
  return (
    <div className={`${styles.card} ${props.additionalStyles}`}>
      {props.children}
    </div>
  );
}
Card.propTypes = {
  additionalStyles: PropTypes.string,
  children: PropTypes.element,
};
export default Card;
