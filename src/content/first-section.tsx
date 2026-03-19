import AutoTyper from "../components/autoTyper/react-typed";
import placeholderImg from "../assets/placeholder.png";
import LogoSuite from "../components/logoButtons/logoSuite";
import envelope_black from "../assets/envelope_black.svg";
import github_black from "../assets/github_black.svg";
import linkedin_black from "../assets/linkedin_black.svg";

import './first-section.scss';
import "../components/logoButtons/logoButton.scss"


function FirstSection() {
  return (
    <div className="first-section">
        <div className="intro-text">
        <AutoTyper strings={["Full-stack Developer.", "DevOps Engineer.", "Software Engineer."]} />
        <p>I build scalable, high-performance applications using TypeScript, JavaScript, React, Node.js, AWS, and LLM orchestration.
            From crafting intuitive frontends to designing robust APIs, cloud architecture, and intelligent AI workflows, I deliver quality code that drives real impact.
            Passionate about solving complex challenges in fast-paced, collaborative environments. Ready to build something exceptional together</p>
        </div>
        <div className="intro-right">
            <div className="intro-image">
                <img src={placeholderImg}/>
            </div>
            <div className="logo-suite">
                <LogoSuite srcs={[envelope_black, github_black, linkedin_black]} />
            </div>
        </div>
    </div>
  );
}

export default FirstSection;