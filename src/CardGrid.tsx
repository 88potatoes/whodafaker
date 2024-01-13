import Card from "./Card";

interface cardGridProps {
    items: string[],
    deletable: boolean,
    delete: Function
}

function CardGrid(props: cardGridProps) {
    console.log(props.items)
    return (
    <div className="container row gx-3">
        {props.items.map((item, index) => {
            return <Card word={item} key={index} deletable={props.deletable} delete={props.delete}/>
        })}
    </div>
    );
}

export default CardGrid;