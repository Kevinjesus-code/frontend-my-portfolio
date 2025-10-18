import Styles from "./iconSocial.module.css";

interface IconSocialProps {
  icon: string;
  enlace: string;
}
const IconSocial = ({ icon, enlace }: IconSocialProps) => {
  return (
    <>
      <div className={Styles.iconContainer}>
        <a href={enlace} target="_blank" rel="noreferrer" className={Styles.iconContainer} >
        <img 
        className={Styles.icon}
        src={icon} 
        alt="icon" 
        width={20} 
        height={20} 
        />
        </a>
      </div>
    </>
  );
};

export default IconSocial;
