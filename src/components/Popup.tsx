import { ReactNode } from "react";

interface PopupProps {
    children: ReactNode,
    isVisible: boolean,
    closePopup: () => void
}
function Popup({ children, isVisible, closePopup }: PopupProps) {

    return (
        <><div className="position-fixed m-0 d-flex flex-column justify-content-center align-items-center" style={{ bottom: '1rem', right: '1rem', minWidth: '300px', minHeight: "200px", background: "white", zIndex: 40, visibility: isVisible ? "visible" : "hidden" }}>
            <button className="position-absolute top-0 start-0" onClick={() => { closePopup(); }}>X</button>
            {children}
        </div>
        </>
    );
}

export default Popup;