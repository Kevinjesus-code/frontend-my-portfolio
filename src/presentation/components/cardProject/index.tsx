import { useState } from "react";
import type { cardProject } from "../../types/cardProject";
import CardDetailsProject from "../cardDetailsProject";
import { ArrowRight, ExternalLink } from "lucide-react";
import Styles from "./cardPortofolio.module.css";

const CardProject = ({
  title,
  description,
  image,
  demoUrl,
  Technologies,
  githubUrl,
}: cardProject) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={Styles.projectCard}>
        <div className={Styles.projectCardImage}>
          <img src={image} alt={title} />
        </div>

        <div className={Styles.projectCardContent}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className={Styles.projectCardLinks}>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${Styles.projectCardLink} ${Styles.demo}`}
            >
              Live Demo <ExternalLink size={14} />
            </a>
          )}

          <a
            onClick={() => setOpen(!open)}
            className={`${Styles.projectCardLink} ${Styles.details}`}
          >
            Details <ArrowRight size={14} />
          </a>
        </div>
      </div>
      {open && (
        <CardDetailsProject
          title={title}
          image={image}
          description={description}
          technologies={Technologies}
          demoUrl={demoUrl}
          githubUrl={githubUrl}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default CardProject;
