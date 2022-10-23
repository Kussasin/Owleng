import React, { useMemo, useState } from "react";
import styles from "../Tests/tests.module.scss";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import CustomButton from "../UI/CustomButton/CustomButton";
import Card from "../Card/Card";

const data = {
  grammarTests: {
    topic: "Grammar tests",
    themes: [
      {
        id: 0,
        name: "Temat 1",
        questions: [
          {
            id: 1,
            question: "some question?",
            answers: ["answer1", "answer2"],
            correctAnswerId: 0,
          },
        ],
      },
    ],
  },
  vocabularyTests: {
    topic: "Vocabulary tests",
    themes: [
      {
        id: 0,
        name: "Vocabulary Temat 1",
        questions: [
          {
            id: 1,
            question: "some question?",
            answers: ["answer1", "answer2"],
            correctAnswerId: 0,
          },
          {
            id: 1,
            question: "some question 2?",
            answers: ["answer1", "answer2"],
            correctAnswerId: 0,
          },
        ],
      },
    ],
  },
  levelCheckTest: {
    topic: "Level check test",
    themes: [
      {
        id: 0,
        name: "Level check test",
        questions: [
          {
            id: 1,
            question: "some question?",
            answers: ["answer1", "answer2"],
            correctAnswerId: 0,
          },
        ],
      },
    ],
  },
};

function Tests() {
  const [selectedTopicId, setselectedTopicId] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [testIsFinish, setTestIsFinish] = useState(false);

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

    if (currentQuestionIndex < currentTheme.questions.length - 1) {
      setCurrentQuestionIndex((prevState) => ++prevState);
    } else {
      setTestIsFinish(true);
    }
  };
  const Theme = useMemo(() => {
    const themes = [];
    for (const key in data) {
      themes.push({
        theme: data[key].topic,
        subt: data[key].themes.map((theme) => theme.name),
      });
    }
    return themes;
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
                  <p className={styles.card_title}>Jesteś na poziomie A2!</p>
                  <div>
                    <p>Twój wynik: {userScore}</p>
                  </div>
                </>
              </Card>
            ) : (
              <div className={styles.content}>
                <p>
                  {
                    data[Object.keys(data)[selectedTopicId]].themes[
                      selectedThemeId
                    ].name
                  }
                </p>
                <div>
                  <p>
                    {
                      data[Object.keys(data)[selectedTopicId]].themes[
                        selectedThemeId
                      ].questions[currentQuestionIndex].question
                    }
                  </p>
                  <div className={styles.grid_container}>
                    {data[Object.keys(data)[selectedTopicId]].themes[
                      selectedThemeId
                    ].questions[currentQuestionIndex].answers.map((answer) => (
                      <CustomButton
                        key={answer}
                        title={answer}
                        onPress={() => onAnswerConfirm(answer)}
                        additionalStyles={styles.answer_button}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Tests;
