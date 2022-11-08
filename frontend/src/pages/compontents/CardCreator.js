import { createRef, useState } from 'react';
import './cardCreator.css';


const FAKE_TAGS = [
    { name : 'Купить машину', selected : false },
    { name : 'Сделать домашку', selected : false },
    { name : 'Вкусно покушать', selected : false },
    { name : 'Я хочу домой', selected : false },
    { name : 'Помогити!', selected : false }
];

export function CardCreator() {

    const descInput = createRef();

    const [ tags, updateTags ] = useState(FAKE_TAGS);
    const [ stage, updateStage ] = useState(0); 

    function tag(item) {
        const { name, selected } = item;
        return (
            <div onClick={() => {
                item.selected = !selected;
                updateTags([...tags]);
            }} key={name} selected='selected' className={`${selected ? 'target-tag-selected' : ''} target-tag`}>
                {name}
            </div>
        );
    }

    return (
        <div className="card-creator-main">
            {
                stage >= 0 ? (
                    <div className='card-creator-top'>
                        <input onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                descInput.current.focus();
                            }
                        }} placeholder='Task name' className="card-creator-main-h1" />
                        <textarea ref={descInput} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                updateStage(stage + 1);
                            }
                        }} placeholder='Task description' className='card-creator-description'/>
                    </div>
                ) : ""
            }
            {
                stage >= 1 ? (
                    <div className='show-amination card-creator-tags'>
                        {tags.map(tag)}
                    </div>
                ) : ""
            }
        </div>
    );
}
