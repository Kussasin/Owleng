import React from "react";
import styles from "./loader.module.scss";
import loaderImg from "./img/owleng_owl.png";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <img className={styles.loaderPicture} src={loaderImg} />
      <div className={styles.loader}></div>
    </div>
  );
};
export default Loader;
