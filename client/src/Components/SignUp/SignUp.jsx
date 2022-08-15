import React from 'react';
import { Link } from 'react-router-dom';
import styles from './signUp.module.css';

function Signup() {
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button
              type="button"
              className={styles.white_btn}
            >
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container}>
            <h1>Create Account</h1>
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
            <button
              type="submit"
              className={styles.green_btn}
            >
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
