import React from "react";
import PropTypes from "prop-types";
import styles from "../video.module.scss";

const VideoPlayer = (props) => {
  return (
    <React.Fragment>
      <p onClick={props.onPress}>Close</p>
      <iframe
        src={`https://www.youtube.com/embed/${props.videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        width="700"
        height="500"
        className={styles.video}
      />
    </React.Fragment>
  );
};

VideoPlayer.propTypes = {
  //currentVideoId: PropTypes.string,
  videoId: PropTypes.string,
  onPress: PropTypes.func,
};

export default VideoPlayer;
