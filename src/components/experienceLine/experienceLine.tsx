import { useState, useEffect, useRef } from 'react';
import Card from './card.tsx';
import DevDot from './devDot.tsx';
import './experienceLine.scss';
import experiences from './experiences.tsx';
import type { expDict } from './card.tsx';

function ExperienceLine() {
  const [selectedExp, setSelectedExp] = useState<expDict | null>(null);

  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Lock scroll-container when modal is open
  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (!container) return;
    if (selectedExp) {
      container.style.overflow = 'hidden';
    } else {
      container.style.overflow = '';
    }
    return () => { container.style.overflow = ''; };
  }, [selectedExp]);

  // Desktop animation
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

      const timelineTop = timelineRect.top - containerRect.top;
      const timelineHeight = timelineRect.height;

      const progress = Math.min(
        1,
        Math.max(
          0,
          (viewportHeight - timelineTop) / (timelineHeight + viewportHeight * 0.3)
        )
      );

      const lineDrawnPx = progress * timelineHeight;
      line.style.transform = `translateX(-50%) scaleY(${progress})`;

      rowRefs.current.forEach((row, i) => {
        const dot = dotRefs.current[i];
        if (!row || !dot) return;

        const dotRect = dot.getBoundingClientRect();
        const timelineRectNow = timeline.getBoundingClientRect();

        const dotOffsetFromTimelineTop =
          dotRect.top + dotRect.height / 2 - timelineRectNow.top;

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

    update();
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const openModal = (exp: expDict) => setSelectedExp(exp);
  const closeModal = () => setSelectedExp(null);

  return (
    <div>
      <div className="timeline-section-header">
        <h2>Mon <span>parcours</span></h2>
        <p>Expériences professionnelles et formations</p>
      </div>

      {/* ── Desktop ── */}
      <div className="experience-desktop-view">
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
                  <div className="dot-wrapper" ref={(el) => { dotRefs.current[index] = el; }}>
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
                  <div className="dot-wrapper" ref={(el) => { dotRefs.current[index] = el; }}>
                    <DevDot />
                  </div>
                  <Card expDict={exp} side="right" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="experience-mobile-view">
        <div className="mobile-timeline">
          <div className="mobile-timeline-line" />
          {experiences.map((exp, i) => {
            const isAlternance = exp.type === 'job' && !!exp.linkedTraining;
            return (
              <button
                key={i}
                className={`mobile-exp-item${isAlternance ? ' mobile-exp-item--alternance' : ''}`}
                onClick={() => openModal(exp)}
              >
                <div className={`mobile-exp-dot${isAlternance ? ' mobile-exp-dot--alternance' : ''}`} />

                {isAlternance ? (
                  <div className="mobile-exp-text">
                    <div className="mobile-exp-alternance-header">
                      <span className="mobile-exp-badge mobile-exp-badge--alternance">Alternance</span>
                      <span className="mobile-exp-dates">{exp.start} – {exp.end}</span>
                    </div>
                    <div className="mobile-exp-dual">
                      <div className="mobile-exp-dual-item">
                        <span className="mobile-exp-badge mobile-exp-badge--job">Emploi</span>
                        <span className="mobile-exp-title">{exp.position}</span>
                        <span className="mobile-exp-company">{exp.company}</span>
                      </div>
                      <div className="mobile-exp-dual-divider" />
                      <div className="mobile-exp-dual-item">
                        <span className="mobile-exp-badge mobile-exp-badge--training">Formation</span>
                        <span className="mobile-exp-title">{exp.linkedTraining!.position}</span>
                        <span className="mobile-exp-company">{exp.linkedTraining!.company}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mobile-exp-text">
                    <span className={`mobile-exp-badge mobile-exp-badge--${exp.type}`}>
                      {exp.type === 'job' ? 'Emploi' : 'Formation'}
                    </span>
                    <span className="mobile-exp-title">{exp.position}</span>
                    <span className="mobile-exp-company">{exp.company}</span>
                    <span className="mobile-exp-dates">{exp.start} – {exp.end}</span>
                  </div>
                )}

                <span className="mobile-exp-arrow">›</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Modal slide-up ── */}
      {selectedExp && (
        <div
          className={`exp-modal-backdrop${selectedExp ? ' open' : ''}`}
          onClick={closeModal}
        >
          <div className="exp-modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="exp-modal-handle" />
            <button className="exp-modal-close" onClick={closeModal} aria-label="Fermer">✕</button>

            {selectedExp.linkedTraining ? (
              // Alternance : emploi + formation simultanés
              <>
                <span className="exp-modal-badge exp-modal-badge--alternance">Alternance</span>
                <p className="exp-modal-dates" style={{ marginBottom: '1.25rem' }}>
                  {selectedExp.start} – {selectedExp.end}
                </p>
                <div className="exp-modal-dual-block">
                  <div className="exp-modal-dual-section">
                    <span className="exp-modal-badge exp-modal-badge--job">Emploi</span>
                    <h3 className="exp-modal-title">{selectedExp.position}</h3>
                    <p className="exp-modal-company">{selectedExp.company}</p>
                    <p className="exp-modal-desc">{selectedExp.description}</p>
                  </div>
                  <div className="exp-modal-dual-divider" />
                  <div className="exp-modal-dual-section">
                    <span className="exp-modal-badge exp-modal-badge--training">Formation</span>
                    <h3 className="exp-modal-title">{selectedExp.linkedTraining.position}</h3>
                    <p className="exp-modal-company">{selectedExp.linkedTraining.company}</p>
                    <p className="exp-modal-desc">{selectedExp.linkedTraining.description}</p>
                  </div>
                </div>
              </>
            ) : (
              // Emploi ou formation simple
              <>
                <span className={`exp-modal-badge exp-modal-badge--${selectedExp.type}`}>
                  {selectedExp.type === 'job' ? 'Emploi' : 'Formation'}
                </span>
                <h3 className="exp-modal-title">{selectedExp.position}</h3>
                <p className="exp-modal-company">{selectedExp.company}</p>
                <p className="exp-modal-dates">{selectedExp.start} – {selectedExp.end}</p>
                <p className="exp-modal-desc">{selectedExp.description}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExperienceLine;
