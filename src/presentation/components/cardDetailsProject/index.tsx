import Styles from "./cardDetailsProject.module.css";
import { ArrowLeft, ExternalLink, Github, Code } from "lucide-react";
import Text from "../text";

interface CardDetailsProjectProps {
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardDetailsProject = ({
  title,
  description,
  image,
  technologies,
  demoUrl,
  githubUrl,
  setOpen,
}: CardDetailsProjectProps) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.blob1}></div>
      <div className={Styles.blob2}></div>
      <div className={Styles.blob3}></div>
      <div className={Styles.blob4}></div>
      <div className={Styles.blob5}></div>

      <div className={Styles.containerScroll}>
        <div className={Styles.containerBody}>
          <button className={Styles.backButton} onClick={() => setOpen(false)}>
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </button>

          <div className={Styles.containerText}>
            <div className={Styles.leftColumn}>
              <div className={Styles.projectHeader}>
                <Text variant="50" fontWeight={800} color="#0284c7">
                  {title}
                </Text>
                <div className={Styles.divider}></div>
              </div>

              <div className={Styles.descriptionSection}>
                <Text variant="16">{description}</Text>
              </div>

              <div className={Styles.technologiesSection}>
                <div className={Styles.sectionTitle}>
                  <Code size={20} color="#0284c7" />
                  <Text variant="20">Technologies Used</Text>
                </div>
                <div className={Styles.techGrid}>
                  {technologies.map((tech, index) => (
                    <div key={index} className={Styles.techItem}>
                      <img
                        src={tech}
                        alt={`Technology ${index + 1}`}
                        className={Styles.techIcon}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={Styles.linksContainerMobile}>
                {demoUrl && (
                  <a
                    href={demoUrl}
                    className={Styles.linkButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    className={`${Styles.linkButton} ${Styles.secondary}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </div>

            <div className={Styles.rightColumn}>
              <div className={Styles.imageWrapper}>
                <div className={Styles.imageContainer}>
                  <img
                    src={image}
                    alt={title}
                    className={Styles.projectImage}
                  />
                </div>
              </div>

              <div className={Styles.linksContainerDesktop}>
                {demoUrl && (
                  <a
                    href={demoUrl}
                    className={Styles.linkButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    className={`${Styles.linkButton} ${Styles.secondary}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} />
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsProject;
