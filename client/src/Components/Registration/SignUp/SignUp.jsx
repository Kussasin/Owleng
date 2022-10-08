import React from "react";
import { Link } from "react-router-dom";
import styles from "./signUp.module.scss";
import regestrationImg from "../../../img/LogRegImg/registration-illustration.svg";
import Header from "../RegHeader/RegHeader";

function Signup() {
  return (
    <div className={styles.registration_page}>
      <div className={styles.registration_page_container}>
        <Header />
        <div className={styles.registration_container}>
          <div className={styles.registration_container_left}>
            <div className={styles.registration_forms_container}>
              <div className={styles.forms_container_content}>
                <form className={styles.form_container}>
                  <h1>Założ nowe konto w Owleng</h1>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    required
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    required
                    className={styles.input}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    className={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    className={styles.input}
                  />
                  <button type="submit" className={styles.submit_button}>
                    Zarejestruj się
                  </button>
                </form>
                <div className={styles.container_content_subscribe}>
                  <p>
                    <span>Masz już profil? </span>
                    <Link to="/login">
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
export default Signup;
