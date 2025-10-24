import Styles from "./cardDetailsProject.module.css";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Text from "../text";

interface cardDetailsProject {
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
}: cardDetailsProject) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.blob1}></div>
      <div className={Styles.blob2}></div>
      <div className={Styles.blob3}></div>
      <div className={Styles.blob4}></div>
      <div className={Styles.blob5}></div>
      <div className={Styles.containerScroll}>
        <div className={Styles.containerBody}>
          <button className={Styles.button} onClick={() => setOpen(false)}>
            <p>
              <ArrowLeft size={20} />
            </p>
            <p>Back</p>
          </button>
          
          <div className={Styles.containerText}>
            <div className={Styles.leftColumn}>
              <div className={Styles.projectInfo}>
                <Text variant="50" color="#0284c7">{title}</Text>
                <div className={Styles.line}><hr /></div>
                <Text variant="16">{description}</Text>
              </div>

              <div className={Styles.technologiesSection}>
                <div className={Styles.technologiesTitle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
                  </svg>
                  <Text variant="20">Technologies Used</Text>
                </div>
                <div className={Styles.techGrid}>
                  {technologies.map((tech, index) => (
                    <img 
                      key={index} 
                      src={tech} 
                      alt={`Technology ${index + 1}`} 
                      className={Styles.tech} 
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={Styles.rightColumn}>
              <div className={Styles.imageContainer}>
                <img src={image} alt={title} className={Styles.image} />
              </div>
              <div className={Styles.urlContainer}>
                {demoUrl && (
                  <a 
                    href={demoUrl} 
                    className={Styles.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo <ExternalLink size={20} />
                  </a>
                )}
                {githubUrl && (
                  <a 
                    href={githubUrl} 
                    className={Styles.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <Github size={20} />
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