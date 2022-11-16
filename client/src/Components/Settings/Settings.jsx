import React, { useRef, useState } from "react";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import styles from "../Settings/settings.module.scss";
import CustomButton from "../UI/CustomButton/CustomButton";
import { useAuth } from "../Registration/AuthContext/AuthContext";

function Settings() {
  const emailRef = useRef()
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    const promises = []

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Hasła nie pasują do siebie");
    }

    if (passwordRef.current.value && passwordRef.current.value.length < 6) {
      return setError("Hasło musi zawieracz więcej 6 symbolów");
    }

    if (emailRef.current.value != currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setMessage("Dane zostałe zmienione");
        setError("");
      })
      .catch((error) => {
        setMessage("");
        if (error.message === "Firebase: Error (auth/requires-recent-login).") {
          setError("Musisz zalogować sie ponownie żeby zmienic swoje dane");
        } else if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("Podany adres e-mail jest już istnieje");
        } else {
          setError("Nie udało się zmienić twoje dane");
        }
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false)
      })

  }

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      <div className={styles.container_content}>
        <div className={styles.container_settings}>
          <h1>
            <center>Ustawienia</center>
          </h1>
          <p>{currentUser && currentUser.email}</p>
          <form method="get" onSubmit={handleSubmit}>
            <div className={styles.change_password}>
              <input
                type="email"
                placeholder="Email"
                name="password"
                ref={emailRef}
                defaultValue={currentUser && currentUser.email}
                className={styles.input}
              />
              Wpisz nowe hasło:
            <input
                type="password"
                placeholder="Password"
                name="password"
                ref={passwordRef}
                className={styles.input}
              />
                  Powtórz nowe hasło:
            <input
                type="password"
                placeholder="Potwierdzenie hasła"
                name="password confirmation"
                ref={passwordConfirmRef}
                className={styles.input}
              />
              <p className={styles.error_msg}>{error}</p>
              <p className={styles.reset_msg}>{message}</p>
              <CustomButton
                title="Zmień"
                additionalStyles={styles.edit_password}
                disabled={loading}
                type="submit"
              ></CustomButton>
            </div>
          </form>

          <br />
          <p className={styles.edit_info}>
            <input></input>
          </p>
          <p className={styles.edit_photo}></p>
        </div>
      </div>
    </div>
  );
}
export default Settings;
