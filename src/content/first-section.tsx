import AutoTyper from "../components/autoTyper/react-typed";
import placeholderImg from "../assets/hero.png";
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
        <p>Je conçois des infrastructures scalables et des systèmes intelligents — de la pipeline CI/CD au cluster Kubernetes, 
            en passant par des applications IA en production. À l'aise de la stack frontend (React, TypeScript) au backend (Python, Java, Node.js), avec un vrai attrait pour le DevOps et l'orchestration LLM. 
            Contactez-moi pour votre prochain défi.</p>
        </div>
        <div className="intro-right">
            <div className="intro-image">
                <img src={placeholderImg}/>
            </div>
            <div className="logo-suite">
                <LogoSuite srcs={[
                    envelope_black,
                    github_black,
                    linkedin_black
                    ]} 
                    links={[
                    "#contact",
                    "https://github.com/zeatop",
                    "https://linkedin.com/in/léo-jackson"
                    ]} />
            </div>
        </div>
    </div>
  );
}

export default FirstSection;