import { OnlyChildProps } from "./PassiveLayout";

/**
 * JSX Element wrapper which gives white box with height of 75% the screen - is a container
 * @param children 
 * @returns 
 */
function ScreenWindow({ children }: OnlyChildProps) {
    return (
        <div className="container hscreen d-flex flex-column justify-content-center">
            <div className="whitecontainer mh-75 m-4">
                <div className="p-4 h-100 container">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ScreenWindow;