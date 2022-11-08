import './card.css';

export function Card(props) {
    const { content } = props;
    const { name, desc, tags } = content;
    return (
        <div className="task">
            <div className="task-name">{name}</div>
            <div className="task-desc">{desc}</div>
        </div>
    );
}
