import { ReactTyped } from "react-typed";
import './auto-typer.scss';

const AutoTyper = ({ strings }: { strings: string[] }) => (
  <div className="auto-typer">
    <ReactTyped
      strings={strings}
      typeSpeed={20}
      backSpeed={20}
      backDelay={1000}
      loop
    />
  </div>
);

export default AutoTyper;