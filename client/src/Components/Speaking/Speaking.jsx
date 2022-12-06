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

function Speaking() {

  const [selectedTopicId, setselectedTopicId] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [testIsFinish, setTestIsFinish] = useState(false);
  const [data, setData] = useState();
  const [text, setCurrentText] = useState();
  const [answerIsRight, setSelectedAnswerId] = useState(undefined);
  const [, setisFisrtElement] = useState();
  const [, setCurrentCorrectAnswerId] = useState();

  let isCorrect = false;
  let correctAnswer = undefined;
  let {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {

    if (data) {
      setCurrentText(
        data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId].texts[currentQuestionIndex].text
      );
    }
  }, [selectedTopicId, selectedThemeId, data]);

    if (data && text != undefined) {
      if (transcript.slice(-1) == "!" || transcript.slice(-1) == "." || transcript.slice(-1) == "?") {
        transcript = transcript.slice(0, -1);
      }
  
      if (listening == false && text.slice(0, -1).toUpperCase() === transcript.toUpperCase() && text != "" && transcript != "") {
        correctAnswer = true;
        isCorrect = correctAnswer;
      }
      else if (listening == false && text.slice(0, -1).toUpperCase() !== transcript.toUpperCase() && text != "" && transcript != "") {
        correctAnswer = false;
      }
      else {
        correctAnswer = undefined;
      }
    }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  if (listening) {
    console.log(`${transcript}`);
  }
  const onAnswerConfirm = () => {

    setUserScore((prevState) => {
      if (answerIsRight) {
        return ++prevState;
      } else {
        return prevState;
      }
    });

  };

  const PlayAudio = (audio) => {

    const AudioPlay = new Audio(audio);
    AudioPlay.play();
  }

  const nextQuestion = () => {
    onAnswerConfirm();

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
    const dbRef = ref(database);
    get(child(dbRef, "speaking"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      <div className={styles.container_content}>
        <LeftSideMenu
          title={Theme}
          // przekazanie funkcji niezbednych dla kontroli stanu testu
          setSelectedThemeId={setSelectedThemeId}
          setselectedTopicId={setselectedTopicId}
          setTestActive={setTestIsFinish}
          setUserScore={setUserScore}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          setCurrentCorrectAnswerId={setCurrentCorrectAnswerId}
          setSelectedAnswerId={setSelectedAnswerId}
          setisFisrtElement={setisFisrtElement}
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
                <div className={styles.answer}>
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
    </div>
  );
}

export default Speaking;
