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
  const [showCopied, setShowCopied] = useState(false);

  const isMailto = url.startsWith("mailto:");

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMailto) {
      e.preventDefault();
      const email = url.replace("mailto:", "");

      try {
        await navigator.clipboard.writeText(email);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 1000);
      } catch (err) {
        console.error("Error al copiar:", err);
        alert(`Email: ${email}`);
      }
    }
  };

  return (
    <a
      href={url}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      className={`${Styles.link} ${isHovered ? Styles.hovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={Styles.iconContainer}>
        <img src={image} alt={platform} className={Styles.customIcon} />
      </div>

      <div className={Styles.textContainer}>
        <span className={Styles.platform}>{platform}</span>
        <span className={Styles.username}>
          {username}{" "}
          {showCopied && <span style={{ color: "#10b981" }}>✓ Copied!</span>}
        </span>
      </div>

      <div className={Styles.arrowContainer}>
        {isMailto ? <icons.Copy size={16} /> : <icons.ExternalLink size={16} />}
      </div>
    </a>
  );
};

export default SocialLink;
