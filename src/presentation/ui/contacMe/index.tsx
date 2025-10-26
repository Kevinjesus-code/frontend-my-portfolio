import { DSAContactMeMessage, DSACardSocialLinks } from "../../components";
import Styles from "./contacMe.module.css";

const ContactMe = () => {
  return (
    <div className={Styles.container}>
     
        <DSAContactMeMessage />
        <DSACardSocialLinks />


    </div>
  );
};

export default ContactMe;
