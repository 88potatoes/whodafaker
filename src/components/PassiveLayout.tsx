import { ReactNode } from "react";

interface OnlyChildProps {
    children: ReactNode
}

function PassiveLayout({ children }: OnlyChildProps) {
    return (<div className="w-100 h-100 d-flex flex-column justify-content-center">
        {children}
    </div>);
}

export default PassiveLayout;

export type { OnlyChildProps };