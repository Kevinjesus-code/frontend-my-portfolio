import { useState } from "react";
import Styles from "./navPortfolio.module.css";
import { icons } from "../../utils/icons";

interface NavPortfolioProps {
  onToggle: (showProjects: boolean) => void;
}

const NavPortfolio = ({ onToggle }: NavPortfolioProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onToggle(index === 0);
  };

  return (
    <nav className={Styles.container}>
      <ul>
        <li
          className={activeIndex === 0 ? Styles.active : ""}
          onClick={() => handleClick(0)}
        >
          Projects
          <icons.Code size={25} strokeWidth={2} />
        </li>
        <li
          className={activeIndex === 1 ? Styles.active : ""}
          onClick={() => handleClick(1)}
        >
          certificates
          <icons.Award size={25} strokeWidth={2} />
        </li>
      </ul>
    </nav>
  );
};

export default NavPortfolio;
