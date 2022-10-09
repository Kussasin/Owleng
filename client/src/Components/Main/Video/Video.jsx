import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./video.module.scss";
import CustomButton from "../../UI/CustomButton/CustomButton";

function SquareButton(key, name, url, linkTo) {
  return (
    <Link to={linkTo} key={key}>
      <div className={styles.button_container}>
        <h3 className={styles.button_container_title}>{name}</h3>
        <img className={styles.button_container_image} src={url} alt={name} />
      </div>
    </Link>
  );
}

function Video() {
  const buttonData = [
    { url: "", link: "/" },
    { url: "", link: "/" },
    { url: "", link: "/" },
    { url: "", link: "/" },
    { url: "", link: "/" },
    { url: "", link: "/" },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <Header />
      </div>
      <div className={styles.container_content}>
        <CustomButton title="Filtruj" additionalStyles={styles.button_style} />
        <CustomButton title="Sortuj" additionalStyles={styles.button_style} />
        <div className={styles.video_grid}>
          {buttonData.map((item) =>
            SquareButton(item.title, item.title, item.url, item.link)
          )}
        </div>
        <CustomButton
          title="Zobać więcej"
          additionalStyles={styles.load_more}
        />
      </div>
    </div>
  );
}
export default Video;
