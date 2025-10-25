import Styles from "./aboutMe.module.css";
import { DSAButton, DSAText, DSACardSkill } from "../../components";
import { Skills } from "../../utils/skills";
const AboutMe = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.containerHeader}>
        <DSAText variant="42" color="#0284c7" fontWeight={800}>
          About me
        </DSAText>
        <DSAText variant="20" fontWeight={200}>
          Transforming ideas into digital experiences 💻
        </DSAText>
      </div>
      <div className={Styles.containerBody}>
        <div>
          <div className={Styles.containerInfo}>
            <DSAText variant="28" color="#0284c7" fontWeight={800}>
              Hello, I'm Kevin More Sandoval
            </DSAText>
          </div>
          <div className={Styles.containerDescription}>
            <DSAText variant="16" fontWeight={100}>
              I'm a Frontend Developer Jr. and Systems Engineering student.
              Passionate about web and mobile development, focused on building
              modern, functional, and efficient digital solutions. I love
              continuous learning and staying updated with the latest JavaScript
              ecosystem technologies.
            </DSAText>
          </div>
          <div className={Styles.containerBtn}>
            <DSAButton
              variant="solid"
              backgroundColor="#0284c7"
              downloadUrl="/assets/certificates/curriculumVitae.pdf"
              downloadFilename="Curriculum Vitae.pdf"
            >
              Download CV
            </DSAButton>
            <DSAButton variant="outline" color="#0284c7">
              Contact me
            </DSAButton>
          </div>
        </div>
      </div>
      <div className={Styles.containerFooter}>
        <div className={Styles.containerHeaderSkills}>
          <DSAText variant="20">Skills</DSAText>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
          </svg>
        </div>
        <div className={Styles.containerLogoSkills}>
          {Skills.map((skill) => (
            <DSACardSkill
              key={skill.id}
              name={skill.name}
              image={skill.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
