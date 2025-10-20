import type { cardPortofolio } from "../../types/cardPortfolio"
import { ArrowRight, ExternalLink } from "lucide-react"
import Styles from "./cardPortofolio.module.css"

const CardPortfolio = ({
  title,
  description,
  image,
  demoUrl,
  detailsUrl,
}: cardPortofolio) => {
  return (
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

        {detailsUrl && (
          <a
            href={detailsUrl}
            className={`${Styles.projectCardLink} ${Styles.details}`}
          >
            Details <ArrowRight size={14} />
          </a>
        )}
      </div>
    </div>
  )
}

export default CardPortfolio
