import { useEffect, useRef } from 'react';
import Card from './card.tsx';
import DevDot from './devDot.tsx';
import './experienceLine.scss';
import experiences from './experiences.tsx';

function ExperienceLine() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const scrollContainer = document.getElementById('scroll-container');
    const timeline = timelineRef.current;
    const line = lineRef.current;
    if (!scrollContainer || !timeline || !line) return;

    let rafId: number;

    const update = () => {
      const timelineRect = timeline.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const viewportHeight = containerRect.height;

      // Progression de la ligne (0 → 1)
      const timelineTop = timelineRect.top - containerRect.top;
      const timelineHeight = timelineRect.height;

      const progress = Math.min(
        1,
        Math.max(
          0,
          (viewportHeight - timelineTop) / (timelineHeight + viewportHeight * 0.3)
        )
      );

      // Hauteur réelle dessinée par la ligne en px
      const lineDrawnPx = progress * timelineHeight;

      // Met à jour le scaleY de la ligne
      line.style.transform = `translateX(-50%) scaleY(${progress})`;

      // Pour chaque row : on compare la position du dot avec lineDrawnPx
      rowRefs.current.forEach((row, i) => {
        const dot = dotRefs.current[i];
        if (!row || !dot) return;

        const dotRect = dot.getBoundingClientRect();
        const timelineRectNow = timeline.getBoundingClientRect();

        // Position Y du centre du dot depuis le haut de la timeline
        const dotOffsetFromTimelineTop =
          dotRect.top + dotRect.height / 2 - timelineRectNow.top;

        // Le dot est "atteint" si la ligne a dépassé sa position
        const reached = lineDrawnPx >= dotOffsetFromTimelineTop;

        if (reached) {
          row.classList.add('visible');
          row.classList.remove('hidden');
        } else {
          row.classList.remove('visible');
          row.classList.add('hidden');
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Init immédiate
    update();
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="experience-timeline" ref={timelineRef}>
      <div className="timeline-line" ref={lineRef} />
      {experiences.map((exp, index) => (
        <div
          key={index}
          ref={(el) => { rowRefs.current[index] = el; }}
          className={`experience-row ${exp.type === 'job' ? 'left' : 'right'}`}
        >
          {exp.type === 'job' && (
            <>
              <Card expDict={exp} side="left" />
              <div ref={(el) => { dotRefs.current[index] = el; }}>
                <DevDot />
              </div>
              {exp.linkedTraining ? (
                <Card
                  expDict={{ ...exp.linkedTraining, type: 'training', start: exp.start, end: exp.end }}
                  side="right"
                />
              ) : (
                <span />
              )}
            </>
          )}
          {exp.type === 'training' && (
            <>
              <span />
              <div ref={(el) => { dotRefs.current[index] = el; }}>
                <DevDot />
              </div>
              <Card expDict={exp} side="right" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExperienceLine;