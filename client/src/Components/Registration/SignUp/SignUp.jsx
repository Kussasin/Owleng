import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import styles from "./signUp.module.scss";
import PropTypes from "prop-types";

import regestrationImg from "../../../img/LogRegImg/registration-illustration.svg";
import Header from "../RegHeader/RegHeader";

function Signup({ isDarkTheme }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Hasła nie pasują do siebie");
    }

    if (passwordRef.current.value.length < 6) {
      return setError("Hasło musi zawierać więcej niż 6 symbolów");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/levelCheck');
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Podany adres e-mail jest już istnieje");
      } else {
        setError("Nie udało się utworzyć konta");
        console.log(error.message);
      }
    }

    setLoading(false);
  }

  return (
    <div className={`${styles.registration_page} ${isDarkTheme ? styles.darkTheme : styles.lightTheme}`}>
      <div className={styles.registration_page_container}>
        <Header />
        <div className={styles.registration_container}>
          <div className={styles.registration_container_left}>
            <div className={styles.registration_forms_container}>
              <div className={styles.forms_container_content}>
                <form className={styles.form_container} onSubmit={handleSubmit} method="get">
                  <h1>Założ nowe konto w Owleng</h1>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    ref={emailRef}
                    className={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={passwordRef}
                    required
                    className={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password Confirmation"
                    name="password confirmation"
                    ref={passwordConfirmRef}
                    required
                    className={styles.input}
                  />
                  <p className={styles.error_msg}>{error}</p>
                  <button type="submit" disabled={loading} className={styles.submit_button}>
                    Zarejestruj się
                  </button>
                </form>
                <div className={styles.container_content_subscribe}>
                  <p>
                    <span>Masz już profil? </span>
                    <Link to="/login" className={styles.link_styles}>
                      <span>Zaloguj sie</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.registration_container_right}>
            <div className={styles.registration_content}>
              <div className={styles.content_container}>
                <h1 className={styles.content_container_title}>
                  Witamy w Owleng!
                </h1>
                <p className={styles.content_container_subtitle}>
                  Ucz się języka angielskiego przy użyciu materiał&oacute;w
                  w&nbsp;100% w&nbsp;języku angielskim&nbsp;&mdash;
                  w&nbsp;dowolnym miejscu i&nbsp;czasie.
                </p>
              </div>
              <img
                className={styles.content_container_picture}
                src={regestrationImg}
                alt="welcome_picture"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Signup.propTypes = {
  isDarkTheme: PropTypes.bool
}
export default Signup;
