import { useState } from "react";
import { icons } from "../../utils/icons";
import Styles from "./socialLink.module.css";

interface SocialLinkProps {
  platform: string;
  username: string;
  url: string;
  image?: string;
}

const SocialLink = ({ platform, username, url, image }: SocialLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${Styles.link} ${isHovered ? Styles.hovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={Styles.iconContainer}>
        <img src={image} alt={platform} className={Styles.customIcon} />
      </div>

      <div className={Styles.textContainer}>
        <span className={Styles.platform}>{platform}</span>
        <span className={Styles.username}>{username}</span>
      </div>

      <div className={Styles.arrowContainer}>
        <icons.ExternalLink size={16} />
      </div>
    </a>
  );
};

export default SocialLink;
