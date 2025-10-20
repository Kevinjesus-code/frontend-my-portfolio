import React, { useState } from "react";
import styles from "./navbar.module.css";

interface NavbarProps {
  setPage: (page: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  const [activeIndex, setActiveIndex] = useState(0); // <-- nuevo estado

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setPage(index);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 onClick={() => handleClick(0)}>
            dev<span className={styles.span}>Kevin.</span>
        </h1>
        <ul className={styles.list}>
          <li
            className={activeIndex === 0 ? styles.active : ""}
            onClick={() => handleClick(0)}
          >
            Home
          </li>
          <li
            className={activeIndex === 1 ? styles.active : ""}
            onClick={() => handleClick(1)}
          >
            About me
          </li>
          <li
            className={activeIndex === 2 ? styles.active : ""}
            onClick={() => handleClick(2)}
          >
            Portfolio
          </li>
          <li
            className={activeIndex === 3 ? styles.active : ""}
            onClick={() => handleClick(3)}
          >
            Contacto
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
