import React, { useRef, useState } from "react";
import { useAuth } from "../Registration/AuthContext/AuthContext";
import { database, auth } from "../../utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, update } from "firebase/database";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import styles from "../Settings/settings.module.scss";
import CustomButton from "../UI/CustomButton/CustomButton";

function Settings() {
  const emailRef = useRef()
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [user] = useAuthState(auth);

  function SetError(error) {
    setMessage("");
    console.log(error);
    if (error.message === "Firebase: Error (auth/requires-recent-login).") {
      setError("Musisz zalogować sie ponownie żeby zmienic swoje dane");
    } else if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      setError("Podany adres e-mail jest już istnieje");
    } else if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
      setError("Hasło musi zawieracz więcej 6 symbolów");
    } else {
      setError("Nie udało się zmienić twoje dane");
    }
    console.log(error.message);
  }

  function ChangeListener(promises, email, currentEmail, password, passwordConfirm) {
    setMessage("");

    if (email != "") {
      if (email != currentEmail) {
        promises.push(updateUserEmail(email));
      }
    } else {
      return setError("Pole email musi być wypełnione");
    }

    if (password != "" && password == passwordConfirm) {
      promises.push(updateUserPassword(password));
    }
    else if (password != passwordConfirm) {
      return setError("Hasła nie pasują do siebie");

    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const promises = []
    ChangeListener(promises, emailRef.current.value, currentUser.email, passwordRef.current.value,
      passwordConfirmRef.current.value);
    if (emailRef.current.value && emailRef.current.value != "") {
      if (passwordRef.current.value != "" && passwordConfirmRef.current.value != "" &&
        passwordRef.current.value == passwordConfirmRef.current.value) {
        SendData();
      }
      if (passwordRef.current.value == "" && passwordConfirmRef.current.value == "" &&
        emailRef.current.value != currentUser.email) {
        SendData();
      }
    }

    function SendData() {
      Promise.all(promises)
        .then(() => {
          try {
            update(ref(database, 'users/' + user.uid), {
              email: emailRef.current.value
            });
          } catch (error) {
            console.log(error.message);
          }
          setMessage("Dane zostałe zmienione");
          setError("");
        })
        .catch((error) => {
          SetError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
          <form method="get" onSubmit={handleSubmit}>
            <div className={styles.settings_form}>
              <span className={styles.input_span}>Email:</span>
              <input
                type="email"
                placeholder="Email"
                name="password"
                ref={emailRef}
                defaultValue={currentUser && currentUser.email}
                className={styles.input}
              />
              <span className={styles.input_span}>Wpisz nowe hasło:</span>
              <input
                type="password"
                placeholder="Password"
                name="password"
                ref={passwordRef}
                className={styles.input}
              />
              <span className={styles.input_span}>Powtórz nowe hasło:</span>
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
        </div>
      </div>
    </div>
  );
}
export default Settings;
