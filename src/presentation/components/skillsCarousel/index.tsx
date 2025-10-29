import { useEffect, useRef } from "react";
import Styles from "./skillsCarousel.module.css";
import { DSACardSkill } from "../index";
import { Skills } from "../../utils/skills";

const DSASkillsCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.8;

    const animate = () => {
      scrollPosition += scrollSpeed;

      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0;
      }

      carousel.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    carousel.addEventListener("mouseenter", handleMouseEnter);
    carousel.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      carousel.removeEventListener("mouseenter", handleMouseEnter);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const duplicatedSkills = [...Skills, ...Skills, ...Skills];

  return (
    <div className={Styles.carouselContainer}>
      <div className={Styles.carousel} ref={carouselRef}>
        <div className={Styles.track}>
          {duplicatedSkills.map((skill, index) => (
            <div key={`${skill.id}-${index}`} className={Styles.skillItem}>
              <DSACardSkill name={skill.name} image={skill.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DSASkillsCarousel;
