import GitHubIcon from "./assets/GitHubIcon.svg";
import LinkedInIcon from "./assets/LinkedInIcon.svg";
import s from "./ExternalPageButtons.module.css";

const ExternalPageButtons = () => {
    return (
        <div className={s.external_links}>
            <button className={s.connection_icon}>
                <GitHubIcon />
            </button>
            <button className={s.connection_icon}>
                <LinkedInIcon />
            </button>
        </div>
    );
};

export default ExternalPageButtons;
