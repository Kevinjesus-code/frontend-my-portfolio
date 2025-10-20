import { DSANavPortfolio, DSAText, DSACardPortfolio } from "../../components";
import Styles from "./portfolio.module.css";
import { CardsPortfolio } from "../../utils/cardsPortfolio";
const Portfolio = () => {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.containerHeader}>
          <div className={Styles.containerText}>
            <DSAText variant="40" color="rgba(255, 255, 255, 1)">
              Portfolio Showcase
            </DSAText>

            <DSAText variant="16" color="rgba(255, 255, 255, 1)">
              Explore my journey through projects, certifications, and technical
              expertise. <br />
              Each section represents a milestone in my continuos learning path.
            </DSAText>
          </div>
          <div className={Styles.containerNav}>
            <DSANavPortfolio />
          </div>
        </div>
        <div className={Styles.containerBody}>
          {CardsPortfolio.map((card) => (
            <DSACardPortfolio key={card.id} {...card} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Portfolio;
