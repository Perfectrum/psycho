import './card.css';

export function Card(props) {
    const { content } = props;
    const { name, desc, tags } = content;

    return (
        <div className='card-with-border'>
            <div className='task-table-card-right'>
                <img src="check_free.png" />
            </div>
            <div>
                <div className='task-table-card-name'>{name}</div>
                <div className='task-table-card-desc'>{desc}</div>
                <div className='task-table-card-info'>
                    <div className='task-table-card-info-tag'>
                        <img src="./star.png"></img>
                        Buy a car
                    </div>
                    <div className='task-table-card-info-tag'>
                        <img src="./book.png"></img>
                        Week
                    </div>
                </div>
            </div>
        </div>
    );

    /*
    return (
        <div className="task">
            <div className="task-name">{name}</div>
            <div className="task-desc">{desc}</div>
        </div>
    ); */
}
