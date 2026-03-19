import "./logoButton.scss";
import "../navigationBar/button/button.scss";

function LogoButton({ src }: { src: string }) {
  return (
    <button className="logo-button framed-button">
      <img src={src}/> 
    </button>
  );
}

export default LogoButton;