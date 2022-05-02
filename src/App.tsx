import s from "./App.module.css";
import ExternalPageButtons from "./ExternalPageButtons";
import HeroPage from "./pages/hero_page/HeroPage";

function App() {
    return (
        <div className={s.app}>
            <ExternalPageButtons />
            <HeroPage />
        </div>
    );
}

export default App;
