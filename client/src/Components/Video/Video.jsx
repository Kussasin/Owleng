import React, { useState, useMemo, useEffect } from "react";
import YouTube from "react-youtube";
import { database } from "../../utils/firebaseConfig";
import { ref, child, get } from "firebase/database";
import styles from "./video.module.scss";
import PropTypes from "prop-types";

import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import CustomButton from "../UI/CustomButton/CustomButton";
import VideoCard from "./innerBlocks/VideoCard";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Checkbox from "../UI/Checkbox/Checkbox";
import Loader from "../UI/Preloader/loader";

const categoriesList = [
  { name: "vocabulary", displayName: "Słownictwo", selected: true },
  { name: "speaking", displayName: "Rozmówki", selected: true },
  { name: "grammar", displayName: "Gramatyka", selected: true },
];

function Video({ isDarkTheme }) {
  const windowDimensions = useWindowDimensions();
  const [showFilters, setshowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setselectedSort] = useState("SortAlphAsc");
  const [categories, setCategories] = useState(categoriesList);
  const [numberVideosToDisplay, setnumberVideosToDisplay] = useState(8);
  const [currentVideoId, setcurrentVideoId] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const play = (videoId) => {
    setcurrentVideoId(videoId);
  };

  const setActiveCategory = (categoryName) => {
    const updatedCategories = [...categories];
    const selectedCategoryId = updatedCategories.findIndex(
      (cat) => cat.name === categoryName
    );
    updatedCategories[selectedCategoryId].selected =
      !updatedCategories[selectedCategoryId].selected;
    setCategories(updatedCategories);
  };

  const videos = useMemo(() => {
    const filteredVideos = videoData.filter(
      (video) => categories.find((cat) => cat.name === video.category).selected
    );
    switch (selectedSort) {
      case "SortAlphAsc":
        filteredVideos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "SortAlphDesc":
        filteredVideos.sort((a, b) => a.title.localeCompare(b.title)).reverse();
        break;
      case "DurationAsc":
        filteredVideos.sort((a, b) => {
          return a.duration - b.duration;
        });
        break;
      case "DurationDesc":
        filteredVideos.sort((a, b) => {
          return b.duration - a.duration;
        });
        break;
    }
    return filteredVideos.slice(0, numberVideosToDisplay);
  }, [numberVideosToDisplay, categories, selectedSort, videoData]);

  useEffect(() => {
    setIsLoading(true);
    const dbRef = ref(database);
    get(child(dbRef, "videos"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setVideoData(snapshot.val());
        } else {
          console.log("No data available");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={`${styles.container} ${isDarkTheme ? styles.darkTheme : styles.lightTheme}`}>
      <div className={styles.container_header}>
        <Header />
        <MobileHeader />
      </div>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
          <div>
            <div
              style={{
                paddingLeft: "10%",
                marginTop: 70,
              }}
            >
              <div className={styles.buttons}>
                <CustomButton
                  title="Filtruj"
                  additionalStyles={styles.button_style}
                  onPress={() => {
                    setShowSort(false);
                    setshowFilters(!showFilters);
                  }}
                />
                <CustomButton
                  title="Sortuj"
                  additionalStyles={styles.button_style}
                  onPress={() => {
                    setshowFilters(false);
                    setShowSort(!showSort);
                  }}
                />
              </div>
              <div>
                {showFilters &&
                  categories.map((category) => (
                    <Checkbox
                      key={category.name}
                      label={category.displayName}
                      value={category.selected}
                      onChange={() => {
                        setActiveCategory(category.name);
                      }}
                    />
                  ))}
                {showSort && (
                  <div>
                    <label className={styles.sort_and_filter}>
                      <input
                        type="radio"
                        value="SortAlphAsc"
                        checked={selectedSort === "SortAlphAsc"}
                        onChange={() => setselectedSort("SortAlphAsc")}
                      />
                    Sortuj A-Z
                  </label>
                    <label className={styles.sort_and_filter}>
                      <input
                        type="radio"
                        value="SortAlphDesc"
                        checked={selectedSort === "SortAlphDesc"}
                        onChange={() => setselectedSort("SortAlphDesc")}
                      />
                    Sortuj Z-A
                  </label>
                    <label className={styles.sort_and_filter}>
                      <input
                        type="radio"
                        value="DurationAsc"
                        checked={selectedSort === "DurationAsc"}
                        onChange={() => setselectedSort("DurationAsc")}
                      />
                    Czas rosnąco
                  </label>
                    <label className={styles.sort_and_filter}>
                      <input
                        type="radio"
                        value="DurationDesc"
                        checked={selectedSort === "DurationDesc"}
                        onChange={() => setselectedSort("DurationDesc")}
                      />
                    Czas malejąco
                  </label>
                  </div>
                )}
              </div>
            </div>
            {videoData.length == 0 ? (
              <div className={styles.videos_null}>Brak video</div>
            ) : (
                <div className={styles.container_content}>
                  <div className={styles.video_grid}>
                    {videos.map((item) => (
                      <VideoCard
                        key={item.id}
                        name={item.title}
                        videoId={item.videoId}
                        onClick={() => play(item.videoId)}
                      />
                    ))}
                  </div>
                  {currentVideoId && (
                    <>
                      <div
                        className={styles.video}
                        style={{ top: windowDimensions.height * 0.25 }}
                      >
                        {videoLoaded && (
                          <div className={styles.close_button_container}>
                            <CustomButton
                              title="X"
                              additionalStyles={styles.close_button}
                              onPress={() => {
                                setVideoLoaded(false);
                                setcurrentVideoId("");
                              }}
                            />
                          </div>
                        )}
                        <YouTube
                          videoId={currentVideoId}
                          onReady={() => setVideoLoaded(true)}
                          opts={{
                            width: windowDimensions.width * 0.5,
                            height: windowDimensions.height * 0.6,
                          }}
                        />
                      </div>
                      <div className={styles.video_background} />
                    </>
                  )}

                  {numberVideosToDisplay <= videos.length && videos.length > 7 ? (
                    <CustomButton
                      title="Zobać więcej"
                      additionalStyles={styles.load_more}
                      onPress={() => {
                        if (numberVideosToDisplay >= videoData.length) {
                          return;
                        } else {
                          setnumberVideosToDisplay((prevState) => prevState + 8);
                        }
                      }}
                    />
                  ) : (
                      videos.length > 7 && (
                        <CustomButton
                          title="Zobać mniej"
                          additionalStyles={styles.load_more}
                          onPress={() => {
                            setnumberVideosToDisplay(8);
                          }}
                        />
                      )
                    )}
                </div>
              )}
          </div>
        )}
    </div>
  );
}

Video.propTypes = {
  isDarkTheme: PropTypes.bool
}

export default Video;
