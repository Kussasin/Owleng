import React, { useMemo, useState, useEffect } from "react";
import { ref, child, get } from "firebase/database";
import { database } from "../../utils/firebaseConfig";
import { formatText } from "../../utils/formatText";
import styles from "./grammar.module.scss";
import PropTypes from "prop-types";

import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import CustomButton from "../UI/CustomButton/CustomButton";
import Card from "../Card/Card";
import Loader from "../UI/Preloader/loader";

function Grammar({ isDarkTheme }) {
  // zmienna dla kontroli aktualnego tematu
  const [selectedTopicId, setselectedTopicId] = useState(0);
  // zmienna dla kontroli aktualnego podtematu
  const [selectedThemeId, setSelectedThemeId] = useState(0);
  // zmienna dla kontroli aktualnego indeksu pytania
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // zmienna dla chronienia aktualnego wyniku
  const [userScore, setUserScore] = useState(0);
  // zmienna dla kontroli stanu testu, false - aktywny (niezakonczony), true - skonczony
  const [testIsFinish, setTestIsFinish] = useState(false);
  // dane z bazy (encja 'mainTests')
  const [data, setData] = useState();
  // zmienna dla chronienia aktualnego poprawngo id odpowiedzi
  // poczatkowo ustawiona na -1 by uniknac problemow pdczas porownywania z indeksem wybranego pytania
  const [currentCorrectAnswerId, setCurrentCorrectAnswerId] = useState(-1);
  // zmienna dla chronienia objektu danych o aktualnym podtemacie
  const [currentTheme, setCurrentTheme] = useState(null);
  // zmienna dla chronienia id wybranej odpowiedzi
  const [selectedAnswerId, setSelectedAnswerId] = useState(undefined);
  const [isFirstElement, setisFisrtElement] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // funkcja dla potwierdzenia wybranej odpowiedzi
  const onAnswerConfirm = (selectedAnswer) => {
    const currentQuestion =
      data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId]
        .questions[currentQuestionIndex];
    // zpisanie id poprawnej odpowiedzi do zmiennej
    const correctAnswerId = currentQuestion.correctAnswerId;
    // przekazanie id aktualnej poprawnej odpowiedzi w useState dla dostepu
    // spoza funkcji
    setCurrentCorrectAnswerId(correctAnswerId);
    // objekt z parametrami aktualnego tematu
    const currentTheme =
      data[Object.keys(data)[selectedTopicId]].themes[selectedThemeId];
    // wyszukanie id wybranej przez uzytkownika odpowiedzi
    const selectedAnswerId = currentQuestion.answers.findIndex(
      (answer) => answer === selectedAnswer
    );
    // przekazanie id wybranej odpowiedzie w useState dla dostepu
    // spoza funkcji
    setSelectedAnswerId(selectedAnswerId);

    // przekazanie objekt wybranego podtematu w useState dla dostepu
    // spoza funkcji
    setCurrentTheme(currentTheme);

    // jezeli id wybranej odpowiedzi = id poprawnej odpowiedzi
    // zmienna = true, jeeli nie - false
    const isAnswerCorrect = selectedAnswerId === correctAnswerId;

    // jezeli wynik poprawny zwiekszamy o 1, jezeli nie zachowujemy poprzednie znaczenie
    setUserScore((prevState) => {
      if (isAnswerCorrect) {
        return ++prevState;
      } else {
        return prevState;
      }
    });
  };

  // funkcja dla przejscia do nastepnego pytania
  const nextQuestion = () => {
    // jezeli index aktualnego pytania < dlugosci tablicy z zapytaniami - 1
    if (currentQuestionIndex < currentTheme.questions.length - 1) {
      // zwiekszenie indeksu aktualnego pytania
      setCurrentQuestionIndex((prevState) => ++prevState);
      // ustawienie aktualnego poprawnego indeksu pytania na -1
      setCurrentCorrectAnswerId(-1);
      // ustawienie id wybranej odpowidzi
      setSelectedAnswerId(undefined);
    } else {
      // zakonczenie testu
      setTestIsFinish(true);
      // ustawienie aktualnego poprawnego indeksu pytania na -1 (przejscie do stanu poczatkowego)
      setCurrentCorrectAnswerId(-1);
      // ustawienie id wybranej odpowidzi (przejscie do stanu poczatkowego)
      setSelectedAnswerId(undefined);
    }
  };
  // funkcja zwracajaca dane dla wyswitlenia menu po lewej stronie
  const Theme = useMemo(() => {
    const themes = [];

    // walidacja na undefined/null
    if (data) {
      // przeksztalcenie struktury danych
      for (const key in data) {
        themes.push({
          theme: data[key].topic, // nazwa tematu
          subt: data[key].themes.map((theme) => theme.name), // tablica nazw podtematow
        });
      }
    }
    return themes;

    // wykonuje sie przy kazdej zmianie zmiennej data
  }, [data]); // tablica zaleznosci

  // wykonanie zapytania do bazy danych w hooku dla unikniecia powtornych zapytan
  // przy rerenderingu
  useEffect(() => {
    setIsLoading(true);
    // polaczenie sie z serwerem
    const dbRef = ref(database);
    get(child(dbRef, "grammar"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // zapisanie danych testow do zmiennej data
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={`${styles.container} ${isDarkTheme ? styles.darkTheme : styles.lightTheme}`}>
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
              setCurrentCorrectAnswerId={setCurrentCorrectAnswerId}
              setSelectedAnswerId={setSelectedAnswerId}
              setisFisrtElement={setisFisrtElement}
            />
            <div className={styles.container_content_right}>
              <div className={styles.container_content_right_content}>
                {isFirstElement ?
                  (
                    data &&
                    (
                      <div className={styles.data_container}>
                        <div className={styles.content_container}>
                          <div className={styles.content}>
                            <p className={styles.name_tests}>
                              {
                                // nazwa podtematu
                                data[Object.keys(data)[selectedTopicId]].themes[
                                  selectedThemeId
                                ].name
                              }
                            </p>
                            <div className={styles.content_text}>
                              {
                                // tekst
                                formatText(
                                  data[Object.keys(data)[selectedTopicId]].themes[
                                    selectedThemeId
                                  ].text, "_n")
                              }
                            </div>
                          </div>
                        </div>
                        <div className={styles.button_style}>
                          <CustomButton
                            title={"Przejdź do testu"}
                            additionalStyles={styles.button_style}
                            onPress={() => setisFisrtElement(false)}
                          />
                        </div>
                      </div>
                    )
                  ) :
                  (
                    testIsFinish ?
                      (
                        <Card additionalStyles={styles.card}>
                          <p>Ilość prawidłowych odpowiedzi: {userScore} / {data[Object.keys(data)[selectedTopicId]].themes[
                            selectedThemeId
                          ].questions.length}</p>
                        </Card>
                      ) : (
                        // data (undefined | [{}]) && jsx, true && jsx -> jsx, false && jsx -> false
                        data && (
                          <div className={styles.data_container}>
                            <div >
                              <p className={styles.name_tests}>
                                {
                                  // nazwa podtematu
                                  data[Object.keys(data)[selectedTopicId]].themes[
                                    selectedThemeId
                                  ].name
                                }
                              </p>
                              <div className={styles.question_container}>
                                <div className={styles.question_container_text}>
                                  <p className={styles.question}>
                                    {
                                      // tekst pytania
                                      data[Object.keys(data)[selectedTopicId]].themes[
                                        selectedThemeId
                                      ].questions[currentQuestionIndex].question
                                    }
                                  </p>
                                </div>
                                <div className={styles.grid_container}>
                                  {data[Object.keys(data)[selectedTopicId]].themes[
                                    selectedThemeId
                                  ].questions[currentQuestionIndex].answers.map(
                                    (answer, index) => {
                                      let additionalStyle1;
                                      // ustawienie stylow dla wybranej odpowiedzi
                                      if (index === selectedAnswerId) {
                                        if (index === currentCorrectAnswerId) {
                                          additionalStyle1 = styles.answer_button_correct;
                                        } else if (currentCorrectAnswerId !== -1) {
                                          additionalStyle1 = styles.answer_button_wrong;
                                        }
                                      }
                                      let additionalStyle2;
                                      // ustawienie stylow dla poprawnej odpowiedzi
                                      if (index === currentCorrectAnswerId) {
                                        additionalStyle2 = styles.answer_button_correct;
                                      }
                                      return (
                                        <CustomButton
                                          key={answer}
                                          title={answer}
                                          onPress={() => onAnswerConfirm(answer)}
                                          additionalStyles={`${styles.answer_button} ${additionalStyle1} ${additionalStyle2}`}
                                        />
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className={styles.button_style}>
                              <CustomButton
                                title={"Następne pytanie"}
                                additionalStyles={styles.button_style}
                                onPress={nextQuestion}
                              />
                            </div>
                          </div>
                        )
                      )
                  )
                }
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

Grammar.propTypes = {
  isDarkTheme: PropTypes.bool
}

export default Grammar;
