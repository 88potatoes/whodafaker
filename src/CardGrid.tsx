import Card from "./Card";

interface cardGridProps {
    items: string[]
}

function CardGrid(props: cardGridProps) {
    return (
    <div className="container row gx-3">
        {props.items.map(item => {
            return <Card word={item}/>
        })}
    </div>
    );
}

export default CardGrid;