import "./card.scss"

interface skillProps {
  skill: string;
  img: string;
  type: string;
}


function Card({properties}: {properties: skillProps}) {
  return (
    <div className="skill-card">
      <img src={`/safemode/icons_skills/${properties.img}`} alt={`${properties.skill} logo`} className="skill-logo" />
      <p>{properties.skill}</p>
    </div>
  );
}

export default Card;
export type { skillProps };