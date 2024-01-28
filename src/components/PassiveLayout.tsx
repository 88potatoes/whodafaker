import { ReactNode } from "react";

interface OnlyChildProps {
    children: ReactNode,
    className?: string
}

/**
 * Gives an element with centered flex column and width, height of 100%. Used for as the container for all pages.
 * @param children
 * @returns 
 */
function PassiveLayout({ children }: OnlyChildProps) {
    return (<div className="w-100 h-100 d-flex flex-column justify-content-center">
        {children}
    </div>);
}

export default PassiveLayout;

export type { OnlyChildProps };