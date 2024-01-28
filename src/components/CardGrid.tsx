import Card from "./Card";

interface cardGridProps {
    items: string[],
    deletable: boolean,
    delete: (a0: string) => void
}

/**
 * Should be placed inside a row object
 * @param props 
 * @returns 
 */
function CardGrid(props: cardGridProps) {
    console.log(props.items)
    return (<>
        {props.items.map((item, index) => {
            return <>
            { index % 5 == 0 && <div className="col-1"></div>}
            <Card word={item} key={index} deletable={props.deletable} delete={props.delete} />
            { index % 5 == 4 && <div className="col"></div>}
            </>
        })}
    </>
    );
}

export default CardGrid;