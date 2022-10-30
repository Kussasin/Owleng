import React, { useState, useEffect } from "react";
import { ref, child, get } from "firebase/database";
import { database } from "../../../utils/firebaseConfig";
import styles from "./levelTest.module.scss";
import CustomButton from "../../UI/CustomButton/CustomButton";
import Card from "../../Card/Card";
import { NavLink } from "react-router-dom";

const Test = () => {
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [TEST, setTEST] = useState([]);

  const onAnswerConfirm = (selectedAnswer) => {
    const isAnswerCorrect =
      TEST[currentQuestionIndex].correctAnswerId ===
      TEST[currentQuestionIndex].answers.findIndex(
        (answer) => answer === selectedAnswer
      );

    setUserScore((prevState) => {
      if (isAnswerCorrect) {
        return ++prevState;
      } else {
        return prevState;
      }
    });
    if (currentQuestionIndex < TEST.length - 1) {
      setCurrentQuestionIndex((prevState) => ++prevState);
    } else {
      setIsTestFinished(true);
    }
  };

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "tests/levelCheck"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setTEST(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.level_test_container}>
      {isTestFinished ? (
        <Card additionalStyles={styles.card}>
          <>
            <p className={styles.card_title}>Jesteś na poziomie A2!</p>
            <div>
              <p>Twój wynik: {userScore}</p>
            </div>
            <NavLink to="/" className={styles.link_container}>
              <CustomButton
                title={"Zacznij naukę ->"}
                onPress={() => {}}
                additionalStyles={styles.card_result_button}
              />
            </NavLink>
          </>
        </Card>
      ) : (
        TEST.length > 0 && (
          <div className={styles.form_container}>
            <p>{TEST[currentQuestionIndex].question}</p>
            <div className={styles.grid_container}>
              {TEST[currentQuestionIndex].answers.map((answer) => (
                <CustomButton
                  key={answer}
                  title={answer}
                  onPress={() => onAnswerConfirm(answer)}
                  additionalStyles={styles.answer_button}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};
export default Test;
