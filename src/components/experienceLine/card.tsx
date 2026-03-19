import './card.scss';

interface expDict {
  company: string;
  position: string;
  start: string;
  end: string;
  description: string;
}

function Card({ expDict, side }: { expDict: expDict; side: 'left' | 'right' }) {
  return (
    <div className={`exp-card ${side}`}>
      <h3>{expDict.position}</h3>
      <h4>{expDict.company}</h4>
      <p>{expDict.description}</p>
    </div>
  );
}

export default Card;
export type { expDict };