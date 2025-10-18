import React from "react";
import styles from "./navbar.module.css";

interface NavbarProps {
  setPage: (page: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1>
          <a href="">
            {" "}
            dev<span className={styles.span}>Kevin.</span>
          </a>
        </h1>
        <ul className={styles.list}>
          <li onClick={() => setPage(0)}>Home</li>
          <li onClick={() => setPage(1)}>About me</li>
          <li onClick={() => setPage(2)}>Portfolio</li>
          <li onClick={() => setPage(3)}>Contacto</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
