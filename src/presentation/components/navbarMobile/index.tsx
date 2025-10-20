import { useState } from "react";
import styles from "./navbarMobile.module.css";

interface NavbarMobileProps {
  setPage: (page: number) => void;
}

const NavbarMobile = ({ setPage }: NavbarMobileProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelect = (page: number) => {
    setPage(page);
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 className={styles.logo} onClick={() => handleSelect(0)}>
          dev <span className={styles.span}>Kevin.</span>
        </h1>

        {/* Botón hamburguesa */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Fondo animado y menú */}
        <div className={`${styles.overlay} ${menuOpen ? styles.open : ""}`}>
          <ul className={styles.menu}>
            <li onClick={() => handleSelect(0)}>Home</li>
            <li onClick={() => handleSelect(1)}>About me</li>
            <li onClick={() => handleSelect(2)}>Portfolio</li>
            <li onClick={() => handleSelect(3)}>Contacto</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavbarMobile;
