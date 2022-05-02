interface Position {
    x: number;
    y: number;
}

type BitChar = "0" | "1";

interface BitProperties {
    arrayPosition: number;
    bitValue: BitChar;
    position: Position;
    context: CanvasRenderingContext2D;
    callback?: () => void;
}

const MIN_OPACITY: number = 0;
const MAX_OPACITY: number = 0.1;
const OPACITY_RATE: number = 0.01;
const FONT_SIZE: string = "1.875rem";
const FONT_COLOR = {
    hue: 0,
    saturation: 0,
    lightness: 44,
};

export default class Bit {
    private _opacity: number;
    private _opacityRate: number;
    private _properties: BitProperties;
    private _drawnOnce: boolean;
    // private _timeout?: number;
    public isFlipping: boolean;

    constructor(properties: BitProperties) {
        this._opacity = MAX_OPACITY;
        this._properties = { ...properties };
        this._opacityRate = OPACITY_RATE;
        this.isFlipping = false;
        this._drawnOnce = false;
        this.draw();
        this._drawnOnce = true;
    }

    public flip = async () => {
        const notFlipping = !this.isFlipping;
        if (notFlipping) {
            this.isFlipping = true;
            // const delayTime = Math.floor(
            //     Math.random() * (1000 - 500 + 1) + 500
            // );
            // await this.timeout(delayTime);
            // clearTimeout(this._timeout);
            // this._timeout = undefined;
        }
        this.toggleBitValue();
        this.updateOpacity();
        this.draw();
        this.tryStopFlip();

        return {
            arrayPosition: this._properties.arrayPosition,
            isFlipping: this.isFlipping,
        };
    };

    // private timeout(milliseconds: number) {
    //     return new Promise(
    //         (resolve) => (this._timeout = setTimeout(resolve, milliseconds))
    //     );
    // }

    private toggleBitValue(): void {
        if (this._opacity > MIN_OPACITY) return;

        const bit: number = +this._properties.bitValue;
        const bitValue = ((bit + 1) % 2).toString() as BitChar;
        this._properties.bitValue = bitValue;
    }

    private updateOpacity(): void {
        const opacityLimitExceeded: boolean = this.isOpacityLimitExceeded();
        if (opacityLimitExceeded) {
            this._opacityRate = -this._opacityRate;
        }
        this._opacity += this._opacityRate;
    }

    private isOpacityLimitExceeded(): boolean {
        const minExceeded = this._opacity <= MIN_OPACITY;
        const maxExceeded = this._opacity >= MAX_OPACITY;

        return minExceeded || maxExceeded;
    }

    private draw(): void {
        const bitValue: string = this._properties.bitValue;
        const { x, y }: Position = this._properties.position;
        const color: string = this.getColor();
        const { width, fontBoundingBoxAscent } =
            this._properties.context.measureText("0");
        const height = fontBoundingBoxAscent + 2;

        this._properties.context.clearRect(x, y, width, height);
        this._properties.context.font = FONT_SIZE + " Cascadia Code, serif";
        this._properties.context.fillStyle = color;
        this._properties.context.fillText(
            bitValue,
            x,
            this._drawnOnce ? y + height : y
        );
    }

    private getColor(): string {
        const { hue, saturation, lightness } = FONT_COLOR;
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${this._opacity})`;

        return color;
    }

    private tryStopFlip(): void {
        const notFlipped = !(this._opacity >= MAX_OPACITY);
        if (notFlipped) return;

        this.isFlipping = false;
    }
}
