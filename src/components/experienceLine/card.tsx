import './card.scss';

interface expDict {
  type: 'job' | 'training';
  company: string;
  position: string;
  start: string;
  end: string;
  description: string;
  linkedTraining?: {
    company: string;
    position: string;
    description: string;
  };
}

function Card({ expDict, side }: { expDict: expDict; side: 'left' | 'right' }) {
  return (
    <div className={`exp-card ${side}`}>
      <div className={`title`}>
        <h3>{expDict.position}</h3>
        <h4>{expDict.company}</h4>
        <h5>{expDict.start} - {expDict.end}</h5>
      </div>
      <p>{expDict.description}</p>
    </div>
  );
}

export default Card;
export type { expDict };