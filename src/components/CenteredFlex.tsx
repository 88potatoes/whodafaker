import { OnlyChildProps } from "./PassiveLayout";

function CenteredFlex({ children }: OnlyChildProps) {
    return (<div className="d-flex flex-column justify-content-center align-items-center h-100">
        {children}
    </div>);
}

export default CenteredFlex;