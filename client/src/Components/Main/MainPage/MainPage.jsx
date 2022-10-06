import React from 'react';
import { Link } from 'react-router-dom';
import styles from './mainPage.module.scss';
import Header from '../Header/Header';

function SquareButton(name, url, linkTo) {
  return (
    <Link to={linkTo}>
      <div className={styles.button_container}>
        <h3 className={styles.button_container_title}>{name}</h3>
        <img className={styles.button_container_image} src={url} alt={name} />
        <img className={styles.button_container_arrow} src="" alt="arrow" />
      </div>
    </Link>
  );
}

function MainPage() {
  const buttonData = [{ url: 'aa', title: 'Gramatyka', link: '/' }, { url: 'aa', title: 'Czytanie', link: '/' }, { url: 'aa', title: 'Testy', link: '/' }, { url: 'aa', title: 'Słuchanie', link: '/' }, { url: 'aa', title: 'Wideo Materiały', link: '/' }, { url: 'aa', title: 'Mówienie', link: '/' }];
  return (
    <div className={styles.container}>
      <div className={styles.container_header}><Header /></div>
      <div className={styles.container_content}>
        {buttonData.map((item) => (SquareButton(item.title, item.url, item.link)))}
      </div>
    </div>
  );
}

export default MainPage;
