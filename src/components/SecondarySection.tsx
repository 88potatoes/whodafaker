import { OnlyChildProps } from "./PassiveLayout";

/**
 * Element for a secondary section (ie with a different background) - is a bootstrap row
 * Optimal for usage inside a ScreenWindow Element
 * @param children Child element(s)
 * @returns 
 */
function SecondarySection({ children, className }: OnlyChildProps) {
    return (<div className={className}>

        <div className="secondarysection m-2">
            <div className="container p-3">
                <div className="row">
                    {children}
                </div>
            </div>
        </div>
    </div>);
}

export default SecondarySection;