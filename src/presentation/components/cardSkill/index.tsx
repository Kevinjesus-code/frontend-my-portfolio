import Styles from "./cardSkill.module.css";

interface CardSkillProps {
  name: string;
  image: string;
}

const CardSkill = ({ name, image }: CardSkillProps) => {
  return (
    <div className={Styles.card}>
      <div className={Styles.content}>
        <div className={Styles.logoContainer}>
          <img className={Styles.logo} src={image} alt={name} />
        </div>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CardSkill;
