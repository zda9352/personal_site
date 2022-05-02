const CodeBubbleHook = ({
    width = 97.87,
    height = 154.56,
    svgClassName,
}: {
    width?: number;
    height?: number;
    svgClassName?: string;
}) => {
    return (
        <div
            {...(svgClassName ? { className: svgClassName } : "")}
            style={{ width: `${width}px`, height: `${height}px` }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="200.147"
                height="175.372"
                viewBox="0 0 200.147 175.372"
            >
                <defs>
                    <filter
                        id="Path_1894"
                        x="0"
                        y="0"
                        width="200.147"
                        height="175.372"
                        filterUnits="userSpaceOnUse"
                    >
                        <feOffset dx="3" dy="3" in="SourceAlpha" />
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feFlood floodOpacity="0.161" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                </defs>
                <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#Path_1894)"
                >
                    <path
                        id="Path_1894-2"
                        data-name="Path 1894"
                        d="M806.5,102.144s-4.88,8.637-.872,12.379,12.515,19.842,27.472,44.3C858.152,199.781,870.01,256.7,870.01,256.7s-25.57-42.453-56.542-73.292c-17-16.924-27.991-16.381-32.818-18.293s-8.511,4.455-8.511,4.455Z"
                        transform="matrix(0.45, 0.89, -0.89, 0.45, -115.82, -728.35)"
                        fill="#1e1e1e"
                    />
                </g>
            </svg>
        </div>
    );
};

export default CodeBubbleHook;
