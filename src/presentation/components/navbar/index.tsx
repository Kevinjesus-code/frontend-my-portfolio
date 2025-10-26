import { useState, useEffect } from "react";
import styles from "./navbar.module.css";

interface NavbarProps {
  setPage: (page: number) => void;
  currentPage: number;
}

const Navbar = ({ setPage,currentPage }: NavbarProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Home", "About me", "Portfolio", "Contacto"];

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setPage(index);
    setIsMenuOpen(false);
  };
  useEffect(() => {
    setActiveIndex(currentPage);
  }, [currentPage]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 className={styles.logo} onClick={() => handleClick(0)}>
          dev<span className={styles.span}>Kevin.</span>
        </h1>

        {/* Botón hamburguesa (solo visible en mobile) */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Overlay para mobile */}
        <div
          className={`${styles.overlay} ${isMenuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        ></div>

        {/* Menú (desktop y mobile) */}
        <ul className={`${styles.list} ${isMenuOpen ? styles.mobileOpen : ""}`}>
          {menuItems.map((item, index) => (
            <li
              key={item}
              className={activeIndex === index ? styles.active : ""}
              onClick={() => handleClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick(index);
                }
              }}
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
