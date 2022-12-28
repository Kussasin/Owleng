import React, { useState, useEffect } from "react";
import { ref, child, get, update } from "firebase/database";
import { database, auth } from "../../../utils/firebaseConfig";
import styles from "./levelTest.module.scss";
import { Navigate } from "react-router-dom";
import { getLevelBasedOnScore } from "../../../utils/getLevelBasedOnScore";
import PropTypes from "prop-types";

import CustomButton from "../../UI/CustomButton/CustomButton";
import Card from "../../Card/Card";

function Test({ isDarkTheme }) {
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [TEST, setTEST] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [grade, setGrade] = useState("");

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

    setGrade(getLevelBasedOnScore(userScore, TEST.length));
    if (currentQuestionIndex < TEST.length - 1) {
      setCurrentQuestionIndex((prevState) => ++prevState);
    } else {
      setIsTestFinished(true);
    }
  };
  const onStartStudy = () => {
    const userId = auth.currentUser.uid;
    const userEmail = auth.currentUser.email;
    const updates = {};
    updates[`/users/${userId}`] = {
      email: userEmail,
      level: getLevelBasedOnScore(userScore, TEST.length),
    };
    update(ref(database), updates)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
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

  if (isSuccess) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className={`${styles.level_test_container} ${isDarkTheme ? styles.darkTheme : styles.lightTheme}`}>
      {isTestFinished ? (
        <Card additionalStyles={styles.card}>
          <>
            <p className={styles.card_title}>Jesteś na poziomie {grade}</p>
            <div>
              <p>Twój wynik: {userScore}</p>
            </div>
            <CustomButton
              title={"Zacznij naukę ->"}
              onPress={onStartStudy}
              additionalStyles={styles.card_result_button}
            />
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
}

Test.propTypes = {
  isDarkTheme: PropTypes.bool
}

export default Test;
