import React from 'react';
import { Link } from 'react-router-dom';
import styles from './loginStyle.module.scss';
import welcomeImg from '../../../img/LogRegImg/authentication-illustration.svg';
import Header from '../RegHeader/RegHeader';

function Login() {
  return (
    <div className={styles.login_page}>
      <div className={styles.login_page_container}>
        <Header />
        <div className={styles.login_container}>
          <div className={styles.login_container_left}>
            <div className={styles.login_forms_container}>
              <div className={styles.forms_container_content}>
                <form className={styles.form_container}>
                  <h1>Zaloguj się na swoje konto</h1>
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
                  <button
                    type="submit"
                    className={styles.submit_button}
                  >
                    Zaloguj się
                  </button>
                </form>
                <div className={styles.container_content_subscribe}>
                  <p>
                    <span>Nie masz jeszcze profilu? </span>
                    <Link to="/signup">
                      <span>
                        Zarejestruj się
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.login_container_right}>
            <div className={styles.login_content}>
              <div className={styles.content_container}>
                <h1 className={styles.content_container_title}>Ucz się razem z Owleng</h1>
                <p className={styles.content_container_subtitle}>Zaloguj się, aby rozpocząć.</p>
              </div>
              <img className={styles.content_container_picture} src={welcomeImg} alt="welcome_picture" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
