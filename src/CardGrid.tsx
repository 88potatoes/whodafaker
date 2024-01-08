import Card from "./Card";

interface cardGridProps {
    items: string[]
}

function CardGrid(props: cardGridProps) {
    console.log(props.items)
    return (
    <div className="container row gx-3">
        {props.items.map((item, index) => {
            return <Card word={item} key={index}/>
        })}
    </div>
    );
}

export default CardGrid;