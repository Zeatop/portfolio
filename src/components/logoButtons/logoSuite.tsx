import LogoButton from "./logoButton";
import "./logoButton.scss";

function LogoSuite({ srcs, links }: { srcs: string[], links: string[] }) {
  return srcs.map((src, index) => (
    <LogoButton src={src} link={links[index]} />
  ));
}

export default LogoSuite;