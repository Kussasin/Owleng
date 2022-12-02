export const getLevelBasedOnScore = (userScore, numberOfQuestions) => {
  if (userScore <= (numberOfQuestions * 0.2).toFixed(0)) {
    return "A0";
  } else if (
    userScore > (numberOfQuestions * 0.2).toFixed(0) &&
    userScore <= (numberOfQuestions * 0.4).toFixed(0)
  ) {
    return "A1";
  } else if (
    userScore > (numberOfQuestions * 0.4).toFixed(0) &&
    userScore <= (numberOfQuestions * 0.6).toFixed(0)
  ) {
    return "A2";
  } else if (
    userScore > (numberOfQuestions * 0.6).toFixed(0) &&
    userScore <= (numberOfQuestions * 0.8).toFixed(0)
  ) {
    return "B1";
  } else if (userScore > (numberOfQuestions * 0.8).toFixed(0)) {
    return "B2";
  } else {
    return "A0";
  }
};
