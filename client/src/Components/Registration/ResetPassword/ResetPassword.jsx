import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import styles from "./resetPasword.module.scss";
import welcomeImg from "../../../img/LogRegImg/authentication-illustration.svg";
import Header from "../RegHeader/RegHeader";

function ResetPassword() {

  const emailRef = useRef();
  const { resetUserPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetUserPassword(emailRef.current.value);
      setMessage("Sprawdź swoją skrzynkę pocztową");
    } catch (error) {
      setMessage("");
      setError("Nie udało się zresetować hasła");
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div className={styles.login_page}>
      <div className={styles.login_page_container}>
        <Header />
        <div className={styles.login_container}>
          <div className={styles.login_container_left}>
            <div className={styles.login_forms_container}>
              <div className={styles.forms_container_content}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                  <h1>Zaloguj się na swoje konto</h1>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    ref={emailRef}
                    className={styles.input}
                  />
                  {error ? error && <p className={styles.error_msg}>{error}</p>
                    :
                    message && <p className={styles.reset_msg}>{message}</p>}
                  <button type="submit" disabled={loading} className={styles.submit_button}>
                    Resetowanie hasła
                  </button>
                </form>
                <div className={styles.container_content_subscribe}>
                  <p>
                    <Link to="/login" className={styles.link_styles}>
                      <span>Zaloguj sie</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.login_container_right}>
            <div className={styles.login_content}>
              <div className={styles.content_container}>
                <h1 className={styles.content_container_title}>
                  Ucz się razem z Owleng
                </h1>
                <p className={styles.content_container_subtitle}>
                  Zaloguj się, aby rozpocząć.
                </p>
              </div>
              <img
                className={styles.content_container_picture}
                src={welcomeImg}
                alt="welcome_picture"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;
