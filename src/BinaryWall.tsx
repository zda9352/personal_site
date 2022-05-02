import { getBinaryWallSetup } from "./BinaryWall.functions";
import s from "./BinaryWall.module.css";

const BinaryWall = () => {
    const setupBinaryWall = getBinaryWallSetup();
    const binaryWallRef = setupBinaryWall();

    return <canvas ref={binaryWallRef} className={s.wall}></canvas>;
};

export default BinaryWall;
