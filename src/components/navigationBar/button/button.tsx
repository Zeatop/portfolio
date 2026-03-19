import { useRef } from 'react';
import './button.scss';

function Button({ text, isFramed, onClick }: { text: string; isFramed?: boolean; onClick: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--lens-x', `${x}px`);
    btn.style.setProperty('--lens-y', `${y}px`);
  };

  return (
    <button
      ref={btnRef}
      className={isFramed ? "glass-button framed-button" : "glass-button"}
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      {text}
    </button>
  );
}

export default Button;