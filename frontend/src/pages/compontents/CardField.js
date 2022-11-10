import './cardField.css';

import { Card } from "./Card";

export function CardField(props) {
    const { type, content } = props;
    return (
        <div className='card-field-cont'>
            <div className='card-field-h1'>
                { 
                    type === 'progress' ? 'In progress' : 
                    type === 'todo' ? 'To do' :
                    type === 'done' ? 'Done' : ""
                }
            </div>
            <div className="card-field">
                { content.map((e, i) => (<Card mode={type} key={`${e.id}`} content={e}/>)) }
            </div>
        </div>
    );
}
