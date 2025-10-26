import Styles from "./aboutMe.module.css";
import { DSAButton, DSAText, DSACardSkill } from "../../components";
import { Skills } from "../../utils/skills";
import { icons } from "../../utils/icons";

const AboutMe = () => {
  return (
    <div className={Styles.container}>
      {/* Header Section */}
      <div className={Styles.containerHeader}>
        <DSAText variant="42" color="#0284c7" fontWeight={800}>
          About Me
        </DSAText>
        <DSAText variant="20" fontWeight={200}>
          Transforming ideas into digital experiences{" "}
          <span className={Styles.greeting}>💻</span>
        </DSAText>
      </div>

      {/* Body Section */}
      <div className={Styles.containerBody}>
        {/* Left Section - Main Info */}
        <div className={Styles.leftSection}>
          <div className={Styles.containerInfo}>
            <DSAText variant="28" color="#0284c7" fontWeight={800}>
              Hello, I'm Kevin More Sandoval{" "}
              <span className={Styles.greeting}>👋</span>
            </DSAText>
          </div>

          <div className={Styles.containerDescription}>
            <DSAText variant="16" fontWeight={100}>
              I am a <strong>Junior Frontend Developer</strong> interested in
              developing modern, efficient, and user-experience-focused web
              interfaces. I am passionate about transforming ideas into
              functional and visually compelling digital solutions.
              <br />
              <br />I am currently a{" "}
              <strong>Systems Engineering student</strong>, which allows me to
              strengthen my knowledge of programming, software architecture, and
              agile development methodologies.
              <br />
              <br />
              I consider myself responsible, proactive, and focused on
              continuous learning. I enjoy working in teams, taking on new
              challenges, and contributing to the development of projects that
              generate a positive impact on users and the organization.
              <br />
              <br />
              My professional goal is to continue growing in the field of
              frontend development, honing my skills, and participating in
              innovative projects that drive digital transformation.
            </DSAText>
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
              Contact Me
            </DSAButton>
          </div>
        </div>

        <div className={Styles.containerFooter}>
          <div className={Styles.containerHeaderSkills}>
            <DSAText variant="20" fontWeight={600}>
              Skills & Technologies
            </DSAText>
            <icons.Code
              size={24}
              strokeWidth={2}
              className={Styles.skillIcon}
            />
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
    </div>
  );
};

export default AboutMe;
