import LogoButton from "./logoButton";
import "./logoButton.scss";

function LogoSuite({ srcs }: { srcs: string[] }) {
  return srcs.map((src) => (
    <LogoButton src={src} />
  ));
}

export default LogoSuite;