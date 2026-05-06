import "./logoButton.scss";
import "../navigationBar/button/button.scss";

function LogoButton({ src, link }: { src: string; link: string }) {
  const isInternal = link.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isInternal) return;
    e.preventDefault();

    const container = document.getElementById("scroll-container");
    const target = document.getElementById(link.slice(1));
    if (!container || !target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const offset = targetRect.top - containerRect.top + container.scrollTop;

    container.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <a
      className="logo-button framed-button"
      href={link}
      onClick={handleClick}
      {...(!isInternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <img src={src} alt="" />
    </a>
  );
}

export default LogoButton;