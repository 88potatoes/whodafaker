import Card from "./Card";

interface cardGridProps {
    items: string[],
    deletable: boolean,
    delete: (a0: string) => void
}

function CardGrid(props: cardGridProps) {
    console.log(props.items)
    return (
    <div className="container gx-3">
        <div className="row">
            {props.items.map((item, index) => {
                return <Card word={item} key={index} deletable={props.deletable} delete={props.delete}/>
            })}
        </div>
    </div>
    );
}

export default CardGrid;