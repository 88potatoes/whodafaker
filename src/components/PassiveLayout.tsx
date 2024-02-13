import { ReactNode, createContext, useContext, useState } from "react";
import Popup from "./Popup";

/**
 * Props for a component which only takes children as an argument
 * children: ReactNode,
 * className?: string
 */
interface OnlyChildProps {
  children: ReactNode;
  className?: string;
}

/**
 * The popup context
 */
const PopupContext = createContext({});

/**
 * Gives an element with centered flex column and width, height of 100%. Used for as the container for all pages. \
 * Also gives the ability to use popups with usePopup
 * @param children
 * @returns
 */
function PassiveLayout({ children }: OnlyChildProps) {
  const [popupMessage, setPopupMessage] = useState(<></>);
  const [popupVisible, setPopupVisible] = useState(false);

  /**
   * Will display the message in the popup and make it show onscreen
   * @param message The message to be shown in the popup
   */
  function setPopup(message: string | JSX.Element) {
    setPopupMessage(<>{message}</>);
    setPopupVisible(true);
  }

  return (
    <PopupContext.Provider value={{ setPopup }}>
      <div className="w-100 h-100 d-flex flex-column justify-content-center position-relative">
        {children}
        <Popup
          isVisible={popupVisible}
          closePopup={() => {
            setPopupVisible(false);
          }}
        >
          {popupMessage}
        </Popup>
      </div>
    </PopupContext.Provider>
  );
}

/**
 * Hook to use Popup element
 * @returns
 */
export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PassiveLayout element");
  }

  return context;
};

export default PassiveLayout;

export type { OnlyChildProps };
