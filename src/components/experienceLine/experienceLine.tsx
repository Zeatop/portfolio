import Card from './card.tsx';
import DevDot from './devDot.tsx';
import './experienceLine.scss';
import experiences from './experiences.tsx';


function ExperienceLine() {
  return (
    <div className="experience-timeline">
      <div className="timeline-line" />
      {experiences.map((exp, index) => (
        <div
          key={index}
          className={`experience-row ${exp["type"] === 'job' ? 'left' : 'right'}`}
        >
          {exp.type === 'job' && (
            <>
              <Card expDict={exp} side="left" />
              <DevDot />
              {exp.linkedTraining ? (
                <Card expDict={{ ...exp.linkedTraining, type: 'training', start: exp.start, end: exp.end }} side="right" />
              ) : (
                <span></span>
              )}
            </>
          )}
          {exp["type"] === 'training' && (
            <>
              <span></span>
              <DevDot />
              <Card expDict={exp} side="right" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExperienceLine;