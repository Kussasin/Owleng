import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import styles from "./loginStyle.module.scss";
import welcomeImg from "../../../img/LogRegImg/authentication-illustration.svg";
import Header from "../RegHeader/RegHeader";

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, curentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      console.log(curentUser);
      navigate('/');
    } catch (error) {
      setError("Niewłaściwy email lub hasło, spróbuj ponownie");
      console.log(error.message);
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
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    ref={passwordRef}
                    className={styles.input}
                  />
                  <p className={styles.error_msg}>{error}</p>
                  <button type="submit" disabled={loading} className={styles.submit_button}>
                    Zaloguj się
                  </button>
                </form>
                <div className={styles.container_content_subscribe}>
                  <p>
                    <Link to="/reset-password" className={styles.link_styles}>
                      <span>Zapomniałeś hasło?</span>
                    </Link>
                  </p>
                  <p>
                    <span>Nie masz jeszcze profilu? </span>
                    <Link to="/signup" className={styles.link_styles}>
                      <span>Zarejestruj się</span>
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
export default Login;
