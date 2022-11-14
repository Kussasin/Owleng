import React, { useContext, useState, useEffect } from 'react';
import { auth } from "../../../utils/firebaseConfig";
import {
  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,
  signOut, sendPasswordResetEmail
} from "firebase/auth";
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    console.log(currentUser.email);
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updatePassword(password) {
    return () => updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { setCurentUser(user) });
    setLoading(false);
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};