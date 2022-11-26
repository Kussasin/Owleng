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

  function SetError(error){
    setMessage("");
    if (error.message === "Firebase: Error (auth/requires-recent-login).") {
      setError("Musisz zalogować sie ponownie żeby zmienic swoje dane");
    } else if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      setError("Podany adres e-mail jest już istnieje");
    } else {
      setError("Nie udało się zmienić twoje dane");
    }
    console.log(error.message);
  }

  function ChangeListener(promises,email,currentEmail,password,passwordConfirm) {
    if (password !== passwordConfirm) {
      return setError("Hasła nie pasują do siebie");
    }

    if (password && password.length < 6) {
      return setError("Hasło musi zawieracz więcej 6 symbolów");
    }

    if (email != currentEmail) {
      promises.push(updateUserEmail(email));
    }

    if (password) {
      promises.push(updateUserPassword(password));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const promises = []
    ChangeListener(promises,emailRef.current.value,currentUser.email,passwordRef.current
      .value,passwordConfirmRef.current.value);
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
        </div>
      </div>
    </div>
  );
}
export default Settings;
