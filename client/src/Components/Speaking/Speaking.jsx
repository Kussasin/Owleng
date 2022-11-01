import React from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from "./speaking.module.scss";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import Microphone from "../../img/MainImg/Microphone.png";
import Check from '../../img/MainImg/Check.png';
import Cross from '../../img/MainImg/Cross.png';
import CustomButton from "../UI/CustomButton/CustomButton";

function Speaking() {
  const lorem = `You are rat.`;
  const title = "Title 1";
  let answerIsRight = undefined;
  const Theme = [
    { theme: "Temat 1", subt: ["podtemat 1", "podtemat 2", "podtemat 3"] },
    { theme: "Temat 2", subt: ["podtemat 1", "podtemat 2"] },
    { theme: "Temat 3", subt: ["podtemat 1"] },
  ];
  function IsChange(text1, speaking) {
    if (listening == false && text1.toUpperCase() === speaking.toUpperCase() && text1 != "" && speaking != "") {
      answerIsRight = true;
    }
    else if (listening == false && text1.toUpperCase() !== speaking.toUpperCase() && text1 != "" && speaking != "") {
      answerIsRight = false;
    } else {
      answerIsRight = undefined;
    }
  }
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      <div className={styles.container_content}>
        <LeftSideMenu title={Theme} />
        <div className={styles.container_content_right}>
          <p className={styles.container_content_right_title}>
            Naciśnij  na mikrofon i powiedź tekst:
          </p>
          <div className={styles.container_content_right_content}>
            <div className={styles.content}>
              <p className={styles.content_text}>{lorem}</p>
            </div>
          </div>
          <div onChange={IsChange(lorem, transcript)} className={styles.answer}>
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
          <button className={`${styles.speack_button} ${listening ? styles.listening : ''}`} onClick={SpeechRecognition.startListening}>
            <img className={styles.speack_button_micro} src={Microphone} alt="Microphone" />
          </button>
          <p>{transcript}</p>
          {
            answerIsRight ? <CustomButton
              key={title}
              title="Przejdź dalej &#8594;"
             // onPress={() => onAnswerConfirm(answer)}
              additionalStyles={styles.answer_button}
            /> :
              null
          }
        </div>
      </div>
    </div>
  );
}

export default Speaking;
