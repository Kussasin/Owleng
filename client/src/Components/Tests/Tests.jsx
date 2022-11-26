import React, { useMemo, useState, useEffect } from "react";
import { ref, child, get } from "firebase/database";
import { database } from "../../utils/firebaseConfig";
import styles from "../Tests/tests.module.scss";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import CustomButton from "../UI/CustomButton/CustomButton";
import Card from "../Card/Card";

// Porzyklad obiektu podtematu
/*
   {
    "id": 0,
    "name": "Poziom Elementary",
    "questions": [
      {
        "id": 0,
        "question": "What is your best friend like?",
        "answers": [
          "He likes skiing",
          "He is tall and slim",
          "He is cheerful and funny",
          "He is like dogs"
        ],
        "correctAnswerId": 2,
        "hint": "is not correct because ..."
      }
    ]
  }
*/

function Tests() {
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
  // zmienna dla chronienia poziomu obliczonego po zakonczeniu testu
  const [grade, setGrade] = useState("");
  // zmienna dla chronienia aktualnego poprawngo id odpowiedzi
  // poczatkowo ustawiona na -1 by uniknac problemow pdczas porownywania z indeksem wybranego pytania
  const [currentCorrectAnswerId, setCurrentCorrectAnswerId] = useState(-1);
  // zmienna dla chronienia objektu danych o aktualnym podtemacie
  const [currentTheme, setCurrentTheme] = useState(null);
  // zmienna dla chronienia id wybranej odpowiedzi
  const [selectedAnswerId, setSelectedAnswerId] = useState(undefined);

  // funkcja dla potwierdzenia wybranej odpowiedzi
  const onAnswerConfirm = (selectedAnswer) => {
    // obiekt aktualnego zapytania
    /*
      Przyklad obiektu aktualnego pytania
      {
        "id": 0,
        "question": "What is your best friend like?",
        "answers": [
          "He likes skiing",
          "He is tall and slim",
          "He is cheerful and funny",
          "He is like dogs"
        ],
        "correctAnswerId": 2,
        "hint": "is not correct because ..."
      }
    */
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

    // wyznaczenie poziomu na podstawie aktualnego znaczenia wyniku testu
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
    /*
      [
        {
          theme: string
          subt: string[]
        }
      ]
    */
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
    // polaczenie sie z serwerem
    const dbRef = ref(database);
    get(child(dbRef, "tests/mainTests"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // zapisanie danych testow do zmiennej data
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
        />
        <div className={styles.container_content_right}>
          <div className={styles.container_content_right_content}>
            {/* Wyswietlenie wyniku testu */}
            {testIsFinish ? (
              <Card additionalStyles={styles.card}>
                <>
                  <p className={styles.card_title}>
                    Jesteś na poziomie {grade}
                  </p>
                  <div>
                    <p>Ilość prawidłowych odpowiedzi: {userScore}</p>
                  </div>
                </>
              </Card>
            ) : (
              // data (undefined | [{}]) && jsx, true && jsx -> jsx, false && jsx -> false
              data && (
                <div className={styles.content}>
                  <p className={styles.name_tests}>
                    {
                      // nazwa podtematu
                      data[Object.keys(data)[selectedTopicId]].themes[
                        selectedThemeId
                      ].name
                    }
                  </p>
                  <div className={styles.question_container}>
                    <p className={styles.question}>
                      {
                        // tekst pytania
                        data[Object.keys(data)[selectedTopicId]].themes[
                          selectedThemeId
                        ].questions[currentQuestionIndex].question
                      }
                    </p>
                    {/* jezeli odpowiedz wybrana oraz jej id != id poprawnej odpowiedzi */}
                    {selectedAnswerId !== currentCorrectAnswerId &&
                      selectedAnswerId !== undefined && (
                        <p className={styles.hint}>
                          {
                            // wybranie podpowiedzi
                            data[Object.keys(data)[selectedTopicId]].themes[
                              selectedThemeId
                            ].questions[currentQuestionIndex].hint
                          }
                        </p>
                      )}

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
                      <div className={styles.block_custom_button}>
                        <CustomButton
                          title={"Następne pytanie"}
                          onPress={nextQuestion}
                        />
                      </div>
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
