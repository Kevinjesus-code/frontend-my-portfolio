import { useState } from "react";
import {
  DSANavPortfolio,
  DSAText,
  DSACardProject,
  DSACardCertificate,
} from "../../components";
import Styles from "./portfolio.module.css";
import { CardsPortfolio } from "../../utils/cardsPortfolio";
import { Certificates } from "../../utils/certificates";

const Portfolio = () => {
  const [showProjects, setShowProjects] = useState(true);

  console.log("Certificates data:", Certificates); // Para verificar los datos

  return (
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
          <DSANavPortfolio onToggle={setShowProjects} />
        </div>
      </div>
      <div className={Styles.containerBody}>
        {showProjects
          ? CardsPortfolio.map((card) => (
              <DSACardProject key={card.id} {...card} />
            ))
          : Certificates.map((cert) => {
              console.log("Certificate being rendered:", cert); // Verificar cada certificado
              return <DSACardCertificate key={cert.id} certificate={cert} />;
            })}
      </div>
    </div>
  );
};

export default Portfolio;
