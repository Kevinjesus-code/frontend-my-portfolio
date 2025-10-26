import { DSASocialLink } from "..";
import Styles from "./cardSocialLinks.module.css";
import { socialLinks } from "../../utils/socialLinkData";
const CardSocialLinks = () => {
  return (
    <div className={Styles.container}>
      {socialLinks.map((link) => (
        <DSASocialLink
          key={link.id}
          platform={link.platform}
          username={link.username}
          url={link.url}
          image={link.image}
        />
      ))}
    </div>
  );
};

export default CardSocialLinks;
