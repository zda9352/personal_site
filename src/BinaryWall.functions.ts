import { MutableRefObject, useEffect, useRef } from "react";
import BinaryWall from "./BinaryWall.class";

export const getBinaryWallSetup = () => () => {
    const binaryWallRef = useRef() as MutableRefObject<HTMLCanvasElement>;

    useEffect(() => {
        if (binaryWallRef.current) {
            const canvas = binaryWallRef.current;

            new BinaryWall(canvas);
        }
    }, []);

    return binaryWallRef;
};
