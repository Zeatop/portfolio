import { ReactTyped } from "react-typed";
import './auto-typer.scss';

const AutoTyper = ({ strings }: { strings: string[] }) => (
  <div className="auto-typer">
    <ReactTyped
      strings={strings}
      typeSpeed={45}
      backSpeed={35}
      backDelay={1200}
      loop
    />
  </div>
);

export default AutoTyper;