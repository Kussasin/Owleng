import React, { useState } from "react";
//import { Link } from "react-router-dom";
import styles from "./levelTest.module.css";
import CustomButton from "../UI/CustomButton/CustomButton";
import Card from "../Card/Card";

const QUESTIONS = [
  "Don't put your cup on the ...... of the table - someone will knock it off.",
  "Don't put your cup on the ...... of the table - someone will knock it off.",
];

const ANSWERS = ["outside", "edge", "boundary", "border"];

function Test() {
  const [isTestFinished, setIsTestFinished] = useState(false);
  return (
    <div className={styles.level_test_container}>
      {isTestFinished ? (
        <Card additionalStyles={styles.card}>
          <p className={styles.result_title}>Jesteś na poziomie A2!</p>
          <CustomButton
            title={"Zacznij naukę ->"}
            onPress={() => {}}
            additionalStyles={styles.result_button}
          />
        </Card>
      ) : (
        <div className={styles.form_container}>
          <p className={styles.title}>{QUESTIONS[0]}</p>
          <div className={styles.grid_container}>
            {ANSWERS.map((answer) => (
              <CustomButton
                key={answer}
                title={answer}
                onPress={() => setIsTestFinished(true)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Test;
