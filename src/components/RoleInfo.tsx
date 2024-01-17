import { ReactElement } from "react";

interface RoleInfoProps {
    img: string,
    goal: string | ReactElement,
    info: string,
    genstrat: string,
    title: string
}

function RoleInfo({ img, goal, info, genstrat, title } : RoleInfoProps) {
    return ( 
    <div className="my-2 secondarysection">
        <div className="px-2 pt-1">
            <h5 className="pb-0 mb-0">{title}</h5>
        </div>
        <div className="d-flex">
            <div className="d-flex justify-content-end align-items-center m-2">
                <img src={img} alt="villager" width={150} height={150} className="mb-3 rounded roleimage"/>
            </div>
            <div className="d-flex align-items-center">
                <div className="">
                    <p><strong>Goal:</strong> {goal} </p>
                    <p><strong>Info:</strong> {info} </p>
                    <p><strong>General Strategy: </strong>{genstrat}</p>
                </div>
            </div>
        </div>
    </div> );
}

export default RoleInfo;