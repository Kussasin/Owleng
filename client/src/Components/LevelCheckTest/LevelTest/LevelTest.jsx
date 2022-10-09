import React, { useState } from "react";
import styles from "./levelTest.module.scss";
import CustomButton from "../../UI/CustomButton/CustomButton";
import Card from "../../Card/Card";
import { NavLink } from "react-router-dom";

const TEST = [
  {
    id: 0,
    question:
      "Don't put your cup on the ...... of the table - someone will knock it off.",
    correctAnswerId: 1,
    answers: ["outside", "edge", "boundary", "border"],
  },
  {
    id: 1,
    question: "I will see you … 30 minutes!",
    correctAnswerId: 0,
    answers: ["in", "at"],
  },
  {
    id: 2,
    question: "Where … you from?",
    correctAnswerId: 0,
    answers: ["are", "is", "am"],
  },
  {
    id: 3,
    question: "Look at … sea.",
    correctAnswerId: 1,
    answers: ["a", "the", "an"],
  },
  {
    id: 4,
    question: "Present perfect continuous",
    correctAnswerId: 0,
    answers: [
      "I have been listening to my music",
      "I've been worked",
      "I had not heard you",
    ],
  },
  {
    id: 5,
    question: "That is the man ___ works in our company",
    correctAnswerId: 3,
    answers: ["which", "who's", "whose", "who"],
  },
  {
    id: 6,
    question:
      "Can you buy some coffee on your way home? We don't have ___ left",
    correctAnswerId: 3,
    answers: ["some", "no", "a little", "much"],
  },
  {
    id: 7,
    question: "Andrew isn't at home. He ___ the dog",
    correctAnswerId: 0,
    answers: ["is walking", "is walk", "walks", "walk"],
  },

  {
    id: 8,
    question: "The most wonderful thing about baseball is __",
    correctAnswerId: 0,
    answers: ["teamworking", "deadline"],
  },
  {
    id: 9,
    question: "… anybody here?",
    correctAnswerId: 0,
    answers: ["Is", "Are", "Am"],
  },
];

const Test = () => {
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);

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
      )}
    </div>
  );
};
export default Test;
