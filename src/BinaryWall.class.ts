import { is } from "immer/dist/internal";
import Bit from "./Bit.class";

const FONT_SIZE_IN_PIXELS: number = 30;

export default class BinaryWall {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _charWidth: number;
    private _rows: number;
    private _columns: number;
    private _bits: Bit[];
    private _bitsToFlip: number;
    private _bitsFlipping: { [key: number]: Bit };

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._canvas.style.width = "100%";
        this._canvas.style.height = "100%";
        this._context = this.getContext();
        this.setupContext();
        this._charWidth = this._context.measureText("0").width;
        this.updateCanvas();
        this._rows = this.getRowsOnCanvas();
        this._columns = this.getColumnsOnCanvas();
        this._bits = [];
        this.addBits(this._rows * this._columns);
        this._bitsToFlip = Math.floor(this._bits.length * 0.2);
        this._bitsFlipping = {};
        window.onresize = () => this.updateBinaryWall();
        this.start();
    }

    private getContext(): CanvasRenderingContext2D {
        return this._canvas.getContext("2d") ?? new CanvasRenderingContext2D();
    }

    private setupContext(): void {
        const fontSize = FONT_SIZE_IN_PIXELS / 16;
        this._context.font = `${fontSize}rem Cascadia Code, serif`;
    }

    private updateCanvas(): void {
        const { width, height } = this._canvas;
        const imageData = this._context.getImageData(0, 0, width, height);

        this._canvas.width = this._canvas.offsetWidth;
        this._canvas.height = this._canvas.offsetHeight;

        this._context.putImageData(imageData, 0, 0);
    }

    private getRowsOnCanvas(): number {
        const decimalRows = this._canvas.height / FONT_SIZE_IN_PIXELS;
        const rows = Math.floor(decimalRows);

        return rows;
    }

    private getColumnsOnCanvas(): number {
        const decimalColumns = this._canvas.width / (this._charWidth + 10);
        const columns = Math.floor(decimalColumns);

        return columns;
    }

    private updateBinaryWall(): void {
        this.updateCanvas();
        this.updateColumnsAndRows();
        this.updateBits();
    }

    private updateColumnsAndRows() {
        this._columns = this.getColumnsOnCanvas();
        this._rows = this.getRowsOnCanvas();
    }

    private updateBits(): void {
        const previousBits = this._bits.length;
        const currentBits = this._rows * this._columns;
        const bitCount = Math.abs(previousBits - currentBits);
        if (currentBits > previousBits) {
            this.addBits(bitCount);
        } else if (currentBits < previousBits) {
            this.removeBits(bitCount);
        }

        this._bitsToFlip = Math.floor(this._bits.length * 0.2);
    }

    private addBits(bitsToAdd: number): void {
        const start = this._bits.length;
        const end = this._bits.length + bitsToAdd;
        const bits: Bit[] = [];
        for (let i = start; i <= end; i++) {
            const row = this.getBitRow(i);
            const column = this.getBitColumn(i);
            const bitValue = this.getBitValue();
            const rowPosition = row * 30;
            const columnPosition = column * this._charWidth + column * 10;
            const bit = new Bit({
                bitValue,
                context: this._context,
                arrayPosition: i,
                position: {
                    x: columnPosition,
                    y: rowPosition,
                },
                callback: () => this.removeFlippedBit(i),
            });

            bits.push(bit);
        }

        this._bits = this._bits.concat(bits);
    }

    private removeBits(bitsToRemove: number) {
        const startIndex = this._bits.length - bitsToRemove;

        const bits = this._bits.splice(startIndex, bitsToRemove);
        bits.forEach((bit, index) => {
            const bitPosition = startIndex + index;
            if (bit.isFlipping && this._bitsFlipping[bitPosition]) {
                delete this._bitsFlipping[bitPosition];
            }
        });
    }

    private start = () => {
        setInterval(async () => {
            this.addBitsToFlip();
            const bitFlipping = await this.flipBits();
            bitFlipping.forEach((bit) => {
                const notFlipping = !bit.isFlipping;
                if (notFlipping) {
                    delete this._bitsFlipping[bit.arrayPosition];
                }
            });
        }, 200);
    };

    private addBitsToFlip(): void {
        let bitsFlippingCount = Object.keys(this._bitsFlipping).length;
        const isFlippingMaxBits = bitsFlippingCount >= this._bitsToFlip;
        if (isFlippingMaxBits) return;

        while (bitsFlippingCount < this._bitsToFlip) {
            const bitToFlip: number = this.pickRandomBit();
            this._bitsFlipping[bitToFlip] = this._bits[bitToFlip];
            bitsFlippingCount = Object.keys(this._bitsFlipping).length;
        }
    }

    private pickRandomBit(): number {
        let randomBit = Math.floor(Math.random() * this._bits.length);
        while (this._bits[randomBit].isFlipping) {
            randomBit = Math.floor(Math.random() * this._bits.length);
        }

        return randomBit;
    }

    private async flipBits() {
        const flippedBits = Object.values(this._bitsFlipping).map((bit) =>
            bit.flip()
        );
        return await Promise.all(flippedBits);
    }

    private removeFlippedBit(bitToRemove: number) {
        delete this._bitsFlipping[bitToRemove];
    }

    private getBitRow(chosenBit: number): number {
        const rowRatio = chosenBit / this._columns;
        const row = Math.ceil(rowRatio);

        return row;
    }

    private getBitColumn(chosenBit: number): number {
        const columnRatio = chosenBit / this._columns;
        const remainder = columnRatio % 1;
        const column = remainder * this._columns;

        return column;
    }

    private getBitValue(): "0" | "1" {
        return (Math.random() < 0.5 ? "0" : "1") as "0" | "1";
    }
}

/* 
    Things that need to happen:
    1.  Wall should only flip a certain percent of
        the bits.

    2.  Needs to keep track of the percent of bits
        being flipped

    3.  On page resize, number of bits needs to be
        redrawn. Will either add more to list or remove
        a section of bits depending on how the window
        is resized.
*/
