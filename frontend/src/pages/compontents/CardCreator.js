import { createRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cardCreator.css';


const FAKE_BUCKETS = [
    { name : 'Квант', selected : false },
    { name : 'День', selected : false },
    { name : 'Неделя', selected : false },
    { name : 'Месяц', selected : false },
    { name : 'Год', selected : false }
];

export function CardCreator() {

    const descInput = createRef();
    const navigate = useNavigate();

    const [ buckets, updateBuckets ] = useState(FAKE_BUCKETS);
    const [ stage, updateStage ] = useState(0); 

    function bucket(item) {
        const { name, selected } = item;
        return (
            <div onClick={() => {
                const wasSelected = item.selected;
                for (const bucket of buckets) {
                    bucket.selected = false;
                }
                item.selected = !wasSelected;
                updateBuckets([...buckets]);
            }} key={name} selected='selected' className={`${selected ? 'target-bucker-selected' : ''} target-bucker`}>
                {name}
            </div>
        );
    }

    function tableCard(item) {
        return (
            <div onClick={() => updateStage(Math.max(1, stage))} className='card-creator-table-card'>
                <div className='card-table-right'>
                    <img src="back.png" />
                </div>
                <div>
                    <div className='card-table-name'>Name</div>
                    <div className='card-table-desc'>La la la la tu du tu du</div>
                    <div className='card-table-info'>
                        <div className='card-table-info-tag'>
                            <img src="./star.png"></img>
                            Buy a car
                        </div>
                        <div className='card-table-info-tag'>
                            <img src="./book.png"></img>
                            Week
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="card-creator-main">
            {
                stage >= 0 ? (
                    <div className='parent-cards-field'>
                        {tableCard()}
                    </div>
                ) : ""
            }
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
                                updateStage(Math.max(stage, 2));
                            }
                        }} placeholder='Task description' className='card-creator-description'/>
                    </div>
                ) : ""
            }
            {
                stage >= 1 ? (
                    <div className='show-amination card-creator-buckets'>
                        {buckets.map(bucket)}
                    </div>
                ) : ""
            }
        </div>
    );
}
