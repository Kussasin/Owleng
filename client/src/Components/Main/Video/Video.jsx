import React, { useState, useMemo } from "react";
import YouTube from "react-youtube";

import styles from "./video.module.scss";

import Header from "../Header/Header";
import CustomButton from "../../UI/CustomButton/CustomButton";
import VideoCard from "./innerBlocks/VideoCard";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Checkbox from "../../UI/Checkbox/Checkbox";

const videoData = [
  {
    id: "1",
    videoId: "QzLkC8s4lU0",
    title: "GRAMATYKA - czasowniki",
    category: "grammar",
    duration: 248,
  },
  {
    id: "2",
    videoId: "qmhf3sLMKS4",
    title: "GRAMATYKA - rzeczowniki",
    category: "grammar",
    duration: 325,
  },
  {
    id: "3",
    videoId: "y34-TMVZIIw",
    title: "GRAMATYKA - przedimki i zaimki wskazujące",
    category: "grammar",
    duration: 146,
  },
  {
    id: "4",
    videoId: "zbjA4YkN_B0",
    title: "GRAMATYKA - przymiotniki",
    category: "grammar",
    duration: 313,
  },
  {
    id: "5",
    videoId: "26FChHC902U",
    title: "GRAMATYKA - przysłówki",
    category: "grammar",
    duration: 191,
  },
  {
    id: "6",
    videoId: "p133Fgyfxs0",
    title: "GRAMATYKA - czasowniki modalne",
    category: "grammar",
    duration: 489,
  },
  {
    id: "7",
    videoId: "lGFuK71q78k",
    title: "GRAMATYKA - zaimki",
    category: "grammar",
    duration: 280,
  },
  {
    id: "8",
    videoId: "w5krG-1Z5Q8",
    title: "GRAMATYKA - zaimki nieokreślone",
    category: "grammar",
    duration: 218,
  },
  {
    id: "9",
    videoId: "0xUhNkbdnKw",
    title: "GRAMATYKA - dopełniacz saksoński",
    category: "grammar",
    duration: 66,
  },
  {
    id: "10",
    videoId: "CDzuIuNls04",
    title: "GRAMATYKA - liczebniki",
    category: "grammar",
    duration: 149,
  },
  {
    id: "11",
    videoId: "I0jqNJH7anQ",
    title: "GRAMATYKA - czas Present Simple",
    category: "grammar",
    duration: 143,
  },
  {
    id: "12",
    videoId: "R2eTfBJYWE8",
    title: "ROZMÓWKI - szukanie pracy",
    category: "speaking",
    duration: 744,
  },
  {
    id: "13",
    videoId: "AkciSMtF21E",
    title: "ROZMÓWKI - w urzędach",
    category: "speaking",
    duration: 408,
  },
  {
    id: "14",
    videoId: "pF-okhZYdGM",
    title: "ROZMÓWKI - na zakupach",
    category: "speaking",
    duration: 855,
  },
  {
    id: "15",
    videoId: "X7Cn8YUxA6o",
    title: "ROZMÓWKI - nagłe wypadki",
    category: "speaking",
    duration: 750,
  },
  {
    id: "16",
    videoId: "GTCh5lqNG-E",
    title: "ROZMÓWKI - na plaży",
    category: "speaking",
    duration: 375,
  },
  {
    id: "17",
    videoId: "KW4Xrs9Hy2w",
    title: "ROZMÓWKI - w pubie i w restauracji",
    category: "speaking",
    duration: 788,
  },
  {
    id: "18",
    videoId: "A-dR3ZAgppQ",
    title: "ROZMÓWKI - w kinie i w teatrze",
    category: "speaking",
    duration: 704,
  },
  {
    id: "19",
    videoId: "TF2Cgpryluk",
    title: "ROZMÓWKI - rozmowy towarzyskie",
    category: "speaking",
    duration: 475,
  },
  {
    id: "20",
    videoId: "qjDjNQ86e1s",
    title: "SŁOWNICTWO - podstawowe czasowniki",
    category: "vocabulary",
    duration: 308,
  },
  {
    id: "21",
    videoId: "1fcXNdM_PQ4",
    title: "SŁOWNICTWO - sport",
    category: "vocabulary",
    duration: 104,
  },
  {
    id: "22",
    videoId: "nyGYBVMKXa0",
    title: "SŁOWNICTWO - części ciała",
    category: "vocabulary",
    duration: 72,
  },
  {
    id: "23",
    videoId: "42E1WNxWhd8",
    title: "SŁOWNICTWO - pogoda",
    category: "vocabulary",
    duration: 86,
  },
  {
    id: "24",
    videoId: "vAKI7-vLECA",
    title: "SŁOWNICTWO - zawody",
    category: "vocabulary",
    duration: 218,
  },
  {
    id: "25",
    videoId: "rrlnXvqdxqw",
    title: "SŁOWNICTWO - kolory",
    category: "vocabulary",
    duration: 39,
  },
  {
    id: "26",
    videoId: "-Fk97qnasm8",
    title: "SŁOWNICTWO - państwa i narodowości",
    category: "vocabulary",
    duration: 172,
  },
];

const categoriesList = [
  { name: "vocabulary", displayName: "Słownictwo", selected: true },
  { name: "speaking", displayName: "Rozmówki", selected: true },
  { name: "grammar", displayName: "Gramatyka", selected: true },
];

const Video = () => {
  const windowDimensions = useWindowDimensions();
  const [showFilters, setshowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setselectedSort] = useState("");
  const [categories, setCategories] = useState(categoriesList);
  const [numberVideosToDisplay, setnumberVideosToDisplay] = useState(8);
  const [currentVideoId, setcurrentVideoId] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);

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
  }, [numberVideosToDisplay, categories, selectedSort]);

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <Header />
      </div>
      <div
        style={{
          paddingLeft: "10%",
          marginTop: 70,
        }}
      >
        <div>
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
                    title="Close"
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
        {numberVideosToDisplay >= videoData.length ? (
          <CustomButton
            title="Zobać mniej"
            additionalStyles={styles.load_more}
            onPress={() => {
              if (numberVideosToDisplay <= 8) {
                return;
              } else {
                setnumberVideosToDisplay((prevState) => prevState - 8);
              }
            }}
          />
        ) : (
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
        )}
      </div>
    </div>
  );
};
export default Video;
