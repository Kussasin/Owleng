import React, { useMemo, useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ref, child, get } from "firebase/database";
import { database } from "../../utils/firebaseConfig";
import styles from "./speaking.module.scss";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import Microphone from "../../img/MainImg/Microphone.png";
import Check from '../../img/MainImg/Check.png';
import Cross from '../../img/MainImg/Cross.png';
import CustomButton from "../UI/CustomButton/CustomButton";
import Card from "../Card/Card";
import AudioImg from "../../img/Speaking/loudspeakers.png";
import Loader from "../UI/Preloader/loader";

function Speaking() {

  const [selectedTopicId, setselectedTopicId] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [testIsFinish, setTestIsFinish] = useState(false);
  const [isCorrect, setisCorrect] = useState(false);
  const [data, setData] = useState();
  const [text, setCurrentText] = useState(undefined);
  const [answerIsRight, setSelectedAnswerId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [resTranscript, setResetTranscript] = useState(true);
  const [errorMessageHide, seterrorMessageHide] = useState(true);
  const [, setisFisrtElement] = useState();
  const [, setCurrentCorrectAnswerId] = useState();

  let {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript
  } = useSpeechRecognition();

  useEffect(() => {

    if (resTranscript) {
      resetTranscript();
      setisCorrect(false);
      setResetTranscript(false);
    }

  }, [resTranscript])

  useEffect(() => {
    if (data) {
      setCurrentText(
        data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId].texts[currentQuestionIndex].text
      );

      if (text != undefined && transcript != undefined) {
        if (transcript.slice(-1) == "!" || transcript.slice(-1) == "." || transcript.slice(-1) == "?") {
          transcript = transcript.slice(0, -1);
        }

        if (text.slice(0, -1).toUpperCase() === transcript.toUpperCase() && text != "" && transcript != "") {
          setSelectedAnswerId(true);
          setisCorrect(true);
        }
        else if (text.slice(0, -1).toUpperCase() !== transcript.toUpperCase() && text != "" && transcript != "") {
          seterrorMessageHide(false);
        }

        if (listening == false && !errorMessageHide) {//nie działa
          setSelectedAnswerId(false);
          seterrorMessageHide(true);
        }
      }
    }
  }, [transcript, answerIsRight, data, selectedTopicId, selectedThemeId]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  const onAnswerConfirm = () => {

    setUserScore((prevState) => {
      if (answerIsRight) {
        return ++prevState;
      } else {
        return prevState;
      }
    });
    setSelectedAnswerId(undefined);
    setisCorrect(false);

  };

  const PlayAudio = (audio) => {

    const AudioPlay = new Audio(audio);
    AudioPlay.play();

  }

  const nextQuestion = () => {

    onAnswerConfirm();
    resetTranscript();
    if (currentQuestionIndex < data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId].texts.length - 1) {
      setCurrentQuestionIndex((prevState) => ++prevState);
    } else {
      setTestIsFinish(true);
    }
  };

  const Theme = useMemo(() => {
    const themes = [];

    if (data) {
      for (const key in data) {
        themes.push({
          theme: data[key].topic, // nazwa tematu
          subt: data[key].themes.map((theme) => theme.name), // tablica nazw podtematow
        });
      }
    }
    return themes;

    // wykonuje sie przy kazdej zmianie zmiennej data
  }, [data]);

  useEffect(() => {
    setIsLoading(true);

    const dbRef = ref(database);
    get(child(dbRef, "speaking"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
          <div className={styles.container_content}>
            <LeftSideMenu
              title={Theme}
              // przekazanie funkcji niezbednych dla kontroli stanu testu
              setSelectedThemeId={setSelectedThemeId}
              setselectedTopicId={setselectedTopicId}
              setTestActive={setTestIsFinish}
              setUserScore={setUserScore}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              setSelectedAnswerId={setSelectedAnswerId}
              setCurrentCorrectAnswerId={setCurrentCorrectAnswerId}
              setisFisrtElement={setisFisrtElement}
              setResetTranscript={setResetTranscript}
              setisCorrect={setisCorrect}
              setCurrentText={setCurrentText}
              seterrorMessageHide={seterrorMessageHide}
            />
            {testIsFinish ?
              (
                <div className={styles.container_content_right}>
                  <Card additionalStyles={styles.card}>
                    <>
                      <div>
                        <p>Ilość prawidłowych odpowiedzi: {userScore} / {data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId].texts.length}</p>
                      </div>
                    </>
                  </Card>
                </div>
              ) :
              (
                data && (
                  <div className={styles.container_content_right}>
                    <p className={styles.container_content_right_title}>
                      Naciśnij  na mikrofon i powiedź tekst:
                </p>
                    <div className={styles.container_content_right_content}>
                      <div className={styles.speak_container}>
                        <div className={styles.audoi_container}>
                          <img className={styles.image} onClick={() => PlayAudio(data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId].texts[currentQuestionIndex].voicelink)} src={AudioImg} alt="loudspeakers" />
                        </div>
                        <div className={styles.speak_container_content}>
                          <p className={styles.speak_container_content_text}>
                            {data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId].texts[currentQuestionIndex].text}
                          </p>
                          <p className={styles.speak_container_content_translate}>
                            {data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId].texts[currentQuestionIndex].translate}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.answer} /*onChange={IsChange}*/ >
                      {answerIsRight == undefined ?
                        <p className={styles.emptyElement}></p> :
                        (answerIsRight ?
                          <div className={`${styles.answer_result} ${styles.rightAnswer} `}>
                            <img className={styles.answer_result_img} src={Check} alt="chek" />
                            <p className={styles.answer_result_text}>Twoja odpowiedź jest poprawna </p>
                          </div>
                          :
                          <div className={`${styles.answer_result} ${styles.wrongAnswer}`}>
                            <img className={styles.answer_result_img} src={Cross} alt="cross" />
                            <p className={styles.answer_result_text}>Twoja odpowiedź jest błędna </p>
                          </div>
                        )
                      }
                    </div>
                    <button className={`${styles.speack_button} ${listening ? styles.listening : ''}`} disabled={isCorrect} onClick={() => SpeechRecognition.startListening({ language: 'en-US' })}>
                      <img className={styles.speack_button_micro} src={Microphone} alt="Microphone" />
                    </button>
                    <p>{transcript}</p>
                    <CustomButton
                      title="Następne pytanie"
                      additionalStyles={styles.answer_button}
                      onPress={nextQuestion}
                    />
                  </div>
                )
              )
            }
          </div>
        )}
    </div>
  );
}

export default Speaking;
