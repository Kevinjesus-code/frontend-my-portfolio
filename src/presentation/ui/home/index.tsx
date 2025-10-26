import { useState, useEffect } from "react";
import Styles from "./home.module.css";
import { DSAText, DSAButton, DSAIconSocial } from "../../components";

const Home = () => {
  const [studentText, setStudentText] = useState("");
  const [showFrontend, setShowFrontend] = useState(false);

  const studentFullText = "I'm a Systems Engineering student and";

  useEffect(() => {
    let index = -1;
    const interval = setInterval(() => {
      if (index < studentFullText.length - 1) {
        index++;
        setStudentText((prev) => prev + studentFullText.charAt(index));
      } else {
        clearInterval(interval);
        setShowFrontend(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.containerText}>
        <div>
          <DSAText>Hello World, I&apos;m Kevin</DSAText>

          <DSAText variant="40">{studentText}</DSAText>

          {showFrontend && (
            <DSAText color="#0284c7" variant="56" fontWeight={900}>
              Frontend Developer Jr.
            </DSAText>
          )}
        </div>

        <div className={Styles.containerIcon}>
          <DSAIconSocial
            icon="/assets/svg/linkedin.svg"
            enlace="https://www.linkedin.com/in/kevinjesus-code/"
          />
          <DSAIconSocial
            icon="assets/svg/github.svg"
            enlace="https://github.com/Kevinjesus-code"
          />
          <DSAIconSocial
            icon="assets/svg/whatsapp.svg"
            enlace="https://api.whatsapp.com/send/?phone=51917397169&text=Hola+Kevin%2C+vi+tu+portafolio+y+me+interesa+contactarte+para+un+proyecto.&type=phone_number&app_absent=0"
          />
        </div>

        <div className={Styles.containerBtn}>
          <DSAButton
            variant="solid"
            backgroundColor="#0284c7"
            downloadUrl="/assets/certificates/curriculumVitae.pdf"
            downloadFilename="Curriculum Vitae.pdf"
            iconRight="Download"
          >
            Download CV
          </DSAButton>
          <DSAButton variant="outline" color="#0284c7" iconRight="Mail">
            Contact me
          </DSAButton>
        </div>
      </div>
      {/* <DSAIconCloud /> */}
    </div>
  );
};

export default Home;
