import { useState } from "react";
import { DSAText, DSAInputForm, DSATextArea, DSAButton } from "..";
import Styles from "./contactMeMessage.module.css";
import emailjs from "@emailjs/browser";

const ContactMeMessage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({
    type: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status.type === "error") setStatus({ type: "", message: "" });
  };

  const sendEmail = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Por favor, completa todos los campos.",
      });
      return;
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    if (!gmailRegex.test(formData.email)) {
      setStatus({
        type: "error",
        message: "Solo se permiten correos de Gmail (example@gmail.com).",
      });
      return;
    }

    try {
      await emailjs.send(
        "service_qab7eb2",
        "template_3w454ni",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "1G9V6PaPBajFpL4Pw"
      );

      setStatus({
        type: "success",
        message: "✅ Mensaje enviado correctamente.",
      });
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setStatus({ type: "", message: "" }), 1500);
    } catch (error) {
      console.error("Error enviando el mensaje:", error);
      setStatus({
        type: "error",
        message: "❌ Ocurrió un error al enviar el mensaje.",
      });
    }
  };

  return (
    <div className={Styles.containerContactMe}>
      <div className={Styles.header}>
        <div className={Styles.titleWrapper}>
          <div>
            <DSAText variant="20" color="#0284c7" fontWeight={800}>
              Contact Me
            </DSAText>
            <p className={Styles.subtitle}>
              Send me a message and I'll get back to you soon
            </p>
          </div>
        </div>
        <div className={Styles.decorativeLine}></div>
      </div>

      <div className={Styles.formContent}>
        <DSAInputForm
          type="text"
          placeholder="Name"
          icon="User"
          value={formData.name}
          onChange={(v) => handleChange("name", v)}
        />

        <DSAInputForm
          type="email"
          placeholder="example@gmail.com"
          icon="Mail"
          value={formData.email}
          onChange={(v) => handleChange("email", v)}
        />

        <DSATextArea
          rows={5}
          placeholder="Message"
          icon="MessageSquare"
          value={formData.message}
          onChange={(v) => handleChange("message", v)}
        />

        <div className={Styles.containerBtn}>
          <DSAButton
            variant="solid"
            backgroundColor="#0284c7"
            iconRight="Send"
            onClick={sendEmail}
            disabled={!formData.email || !formData.message || !formData.name}
          >
            send message
          </DSAButton>
        </div>

        {status.message && (
          <div
            className={`${Styles.statusMessage} ${
              status.type === "success" ? Styles.success : Styles.error
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMeMessage;
