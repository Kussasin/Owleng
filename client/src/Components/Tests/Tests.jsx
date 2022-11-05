import React, { useMemo, useState, useEffect } from "react";
import { ref, child, get } from "firebase/database";
import { database } from "../../utils/firebaseConfig";
import styles from "../Tests/tests.module.scss";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import CustomButton from "../UI/CustomButton/CustomButton";
import Card from "../Card/Card";

function Tests() {
  const [selectedTopicId, setselectedTopicId] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [testIsFinish, setTestIsFinish] = useState(false);
  const [data, setData] = useState();
  const [grade, setGrade] = useState("");

  const onAnswerConfirm = (selectedAnswer) => {
    const currentQuestion =
      data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId]
        .questions[currentQuestionIndex];
    const currentTheme =
      data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId];
    const selectedAnswerId = currentQuestion.answers.findIndex(
      (answer) => answer === selectedAnswer
    );
    const correctAnswerId = currentQuestion.correctAnswerId;
    const isAnswerCorrect = selectedAnswerId === correctAnswerId;

    setUserScore((prevState) => {
      if (isAnswerCorrect) {
        return ++prevState;
      } else {
        return prevState;
      }
    });

    setGrade(() => {
      if (userScore <= 5) {
        return "A0";
      } else if (userScore > 5 && userScore <= 10) {
        return "A1";
      } else if (userScore > 10 && userScore <= 15) {
        return "A2";
      } else if (userScore > 15 && userScore <= 20) {
        return "B1";
      } else if (userScore > 20 && userScore <= 25) {
        return "B2";
      } else if (userScore > 25) {
        return "C1";
      }
    });

    if (currentQuestionIndex < currentTheme.questions.length - 1) {
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
          theme: data[key].topic,
          subt: data[key].themes.map((theme) => theme.name),
        });
      }
    }

    return themes;
  }, [data]);

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "tests/mainTests"))
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
          setSelectedThemeId={setSelectedThemeId}
          setselectedTopicId={setselectedTopicId}
          setTestActive={setTestIsFinish}
          setUserScore={setUserScore}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />
        <div className={styles.container_content_right}>
          <div className={styles.container_content_right_content}>
            {testIsFinish ? (
              <Card additionalStyles={styles.card}>
                <>
                  <p className={styles.card_title}>
                    Jesteś na poziomie {grade}
                  </p>
                  <div>
                    <p>Twój wynik: {userScore}</p>
                  </div>
                </>
              </Card>
            ) : (
              data && (
                <div className={styles.content}>
                  <p className={styles.name_tests}>
                    {
                      data[Object.keys(data)[selectedTopicId]].themes[
                        selectedThemeId
                      ].name
                    }
                  </p>
                  <div>
                    <p className={styles.question}>
                      {
                        data[Object.keys(data)[selectedTopicId]].themes[
                          selectedThemeId
                        ].questions[currentQuestionIndex].question
                      }
                    </p>
                    <div className={styles.grid_container}>
                      {data[Object.keys(data)[selectedTopicId]].themes[
                        selectedThemeId
                      ].questions[currentQuestionIndex].answers.map(
                        (answer) => (
                          <CustomButton
                            key={answer}
                            title={answer}
                            onPress={() => onAnswerConfirm(answer)}
                            additionalStyles={styles.answer_button}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Tests;
