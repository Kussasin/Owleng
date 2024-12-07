import React from "react";
import PropTypes from "prop-types";

import styles from "../video.module.scss";

const VideoCard = ({ name, videoId, onClick }) => {
  return (
    <div className={styles.button_container} onClick={onClick}>
      <img
        className={styles.button_container_image}
        src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
        alt={name}
      />
      <p className={styles.button_container_title}>
        <b className={styles.button_container_title}>{name}</b>
      </p>
    </div>
  );
};

VideoCard.propTypes = {
  name: PropTypes.string,
  videoId: PropTypes.string,
  onClick: PropTypes.func,
};

export default VideoCard;
