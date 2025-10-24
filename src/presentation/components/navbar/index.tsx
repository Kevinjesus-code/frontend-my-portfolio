import React, { useState } from "react";
import styles from "./navbar.module.css";

interface NavbarProps {
  setPage: (page: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "About me", "Portfolio", "Contacto"];

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setPage(index);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 className={styles.logo} onClick={() => handleClick(0)}>
          dev<span className={styles.span}>Kevin.</span>
        </h1>

        <ul className={`${styles.list} ${isMenuOpen ? styles.active : ""}`}>
          {menuItems.map((item, index) => (
            <li
              key={item}
              className={activeIndex === index ? styles.active : ""}
              onClick={() => handleClick(index)}
              role="button"
              tabIndex={0}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
