import React from "react";
import { Link } from "react-router-dom";
import styles from "./grammar.module.scss";
import Header from "../Main/Header/Header";
import MobileHeader from "../Main/MobileHeader/MobileHeader";
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import CustomButton from "../UI/CustomButton/CustomButton";

function Grammar() {
  const lorem =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quia nam velit dolor perspiciatis, adipisci aperiam quod repellendus culpa reprehenderit officiis sunt ut delectus dicta voluptate quas dolore? Dolorem, veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quia nam velit dolor perspiciatis, adipisci aperiam quod repellendus culpa reprehenderit officiis sunt ut delectus dicta voluptate quas dolore? Dolorem, veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quia nam velit dolor perspiciatis, adipisci aperiam quod repellendus culpa reprehenderit officiis sunt ut delectus dicta voluptate quas dolore? Dolorem, veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quia nam velit dolor perspiciatis, adipisci aperiam quod repellendus culpa reprehenderit officiis sunt ut delectus dicta voluptate quas dolore? Dolorem, veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quia nam velit dolor perspiciatis, adipisci aperiam quod repellendus culpa reprehenderit officiis sunt ut delectus dicta voluptate quas dolore? Dolorem, veniam?";
  const linkTo = "#";
  const Theme = [
    { theme: "Temat 1", subt: ["podtemat 1", "podtemat 2", "podtemat 3"] },
    { theme: "Temat 2", subt: ["podtemat 1", "podtemat 2"] },
    { theme: "Temat 3", subt: ["podtemat 1"] },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.container_header}>
        <MobileHeader />
        <Header />
      </div>
      <div className={styles.container_content}>
        <LeftSideMenu title={Theme} />
        <div className={styles.container_content_right}>
          <div className={styles.container_content_right_content}>
            <div className={styles.content}>
              <p>{lorem}</p>
            </div>
          </div>
          <div className={styles.content_button}>
            <Link to={linkTo}>
              <CustomButton
                title="Przejdź do tes[tu"
                additionalStyles={styles.button_style}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grammar;
