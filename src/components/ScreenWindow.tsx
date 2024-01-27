import { ReactNode } from "react";

interface ScreenWindowProps {
    children: ReactNode
}

function ScreenWindow({ children }: ScreenWindowProps) {

    return (
    <div className="container hscreen d-flex flex-column justify-content-center">
        <div className="whitecontainer h-75 m-4">
            <div className="p-4">
                {children}
            </div>
        </div>

    </div>);
}

export default ScreenWindow;