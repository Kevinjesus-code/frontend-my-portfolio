import {
  DSAContactMeMessage,
  DSACardSocialLinks,
  DSACommentSection,
} from "../../components";
import Styles from "./contacMe.module.css";

const ContactMe = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.containerBody}>
        <DSAContactMeMessage  />
        <DSACardSocialLinks />
      </div>
      <DSACommentSection />
    </div>
  );
};

export default ContactMe;
