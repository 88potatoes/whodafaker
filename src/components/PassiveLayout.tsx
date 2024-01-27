import { ReactNode } from "react";

interface PassiveLayoutProps {
    children: ReactNode
}

function PassiveLayout({ children }: PassiveLayoutProps) {
    return (<div className="w-100 h-100 d-flex flex-column justify-content-center">
        {children}
    </div>);
}

export default PassiveLayout;