import { OnlyChildProps } from "./PassiveLayout";

function ScreenWindow({ children }: OnlyChildProps) {
    return (
        <div className="container hscreen d-flex flex-column justify-content-center">
            <div className="whitecontainer h-75 m-4">
                <div className="p-4 h-100">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ScreenWindow;