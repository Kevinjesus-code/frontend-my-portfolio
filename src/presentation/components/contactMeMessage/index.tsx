import { DSAText, DSAInputForm, DSATextArea,DSAButton } from "..";
import Styles from "./contactMeMessage.module.css";
const ContactMeMessage = () => {
  return (
      <div className={Styles.containerContactMe}>
        <div>
          <DSAText variant="20" color="#0284c7" fontWeight={800}>Contact Me</DSAText>
          <p>Send me a message</p>
        </div>
        <DSAInputForm type="text" placeholder="Name" icon="User" />
        <DSAInputForm type="text" placeholder="Email" icon="Mail" />
        <DSATextArea rows={5} placeholder="Message" icon="MessageSquare" />
        <div className={Styles.containerBtn}>
          <DSAButton variant="solid" backgroundColor="#0284c7"  iconRight="Send">send message</DSAButton>
        </div>
      </div>
  );
};

export default ContactMeMessage;
