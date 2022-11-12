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
      <p style={{ paddingLeft: "10px" }}>
        <b>{name}</b>
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
