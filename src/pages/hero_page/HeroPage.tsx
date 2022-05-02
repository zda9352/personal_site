import CodeBubbleHook from "../../assets/CodeBubbleHook.svg";
import Duck from "../../assets/Duck.svg";
import BinaryWall from "../../BinaryWall";
import s from "./HeroPage.module.css";

const HeroPage = () => {
    return (
        <>
            <section className={s.left_section}>
                <BinaryWall />
                <div className={s.duck_container}>
                    <code className={s.code_bubble}>
                        <span>Console</span>
                        <span>.WriteLine(</span>
                        <span>"How can I help you?"</span>
                        <span>);</span>
                    </code>
                    <CodeBubbleHook svgClassName={s.code_bubble_hook} />
                    <Duck />
                </div>
            </section>

            <section className={s.right_section}>
                <h1 className={s.hero_title}>Zachary D. Armstrong</h1>
                <p className={s.hero_phrase}>
                    A Computer Engineer changing the world one bye at a time.
                </p>
                <button className={s.hero_call_to_action}>Check Me Out</button>
            </section>
        </>
    );
};

export default HeroPage;
