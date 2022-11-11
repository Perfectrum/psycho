import { createRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './cardCreator.css';
import * as cardManager from '../../logic/cards';

import { Card } from './Card';


const UI_CARD_CREATE_BUCKETS = [
    { name : 'Квант', value: cardManager.BUCKETS.quant, selected : false },
    { name : 'День', value: cardManager.BUCKETS.day, selected : false },
    { name : 'Неделя', value: cardManager.BUCKETS.week, selected : false },
    { name : 'Месяц', value: cardManager.BUCKETS.month, selected : false },
    { name : 'Год', value: cardManager.BUCKETS.year, selected : false }
];

const FAKE_TARGETS = [
    "Win hackathon",
    "Buy a car",
    "Cursach",
    "Ya hochu spat",
    "Pomogiti"
].map(e => { return { name : e, selected : false } });

function copy(arr) {
    return arr.map(e => { return {...e} });
}

export function CardCreator() {

    const navigate = useNavigate();

    let parentCardContent = null;
    const { state : locationState } = useLocation();
    if (locationState) {
        const { parentContent } = locationState;
        if (parentContent) {
            parentCardContent = parentContent;
        }
    }

    let editTask = null;
    if (locationState) {
        const { editTask : task } = locationState;
        if (task) {
            editTask = task;
        }
    }

    const [ initialized, makeInitialized ] = useState(false);

    const nameInput = createRef();
    const descInput = createRef();

    useEffect(() => {
        if (editTask && !initialized) {
            nameInput.current.value = editTask.name;
            descInput.current.value = editTask.desc;
            makeInitialized(true);
        }
    }, []);

    const [ buckets, updateBuckets ] = useState(copy(UI_CARD_CREATE_BUCKETS));
    const [ targets, updateTargets ] = useState(copy(cardManager.getGoals().map(
        e => { return { name : e.name, id : e.id, selected : false } }
    )));
    const [ stage, updateStage ] = useState(0);
    const [ choosenBucket, selectBucket ] = useState(null);

    for (const t1 of targets) {
        if (parentCardContent) {
            for (const t2 of parentCardContent.tags) {
                if (t1.name === t2) {
                    t1.selected = true;
                }
            }
        }
    }

    function bucket(item) {
        const { name, selected, value } = item;
        const enabled = parentCardContent === null || cardManager.cmpBuckets(value, parentCardContent.bucket);
        return (
            <div onClick={() => {

                if (!enabled) return;

                for (const bucket of buckets) {
                    bucket.selected = false;
                }

                updateStage(Math.max(stage, 2));
                selectBucket(value);

                item.selected = true;
                updateBuckets([...buckets]);
            }} key={name} className={`${enabled ? '' : 'target-bucker-disabled'} ${selected ? 'target-bucker-selected' : ''} target-bucker`}>
                {name}
            </div>
        );
    }

    function target(item) {
        const { name, selected } = item;
        return (
            <div key={name} onClick={() => {                
                item.selected = !selected;
                updateTargets([...targets]);

            }} className={`${selected ? 'target-target-selected' : ''} target-bucker`}  >{name}</div>
        )
    }

    return (
        <div className="card-creator-main">
            {
                stage >= 0 && parentCardContent ? (
                    <div className='parent-cards-field'>
                        <Card mode='parent' content={parentCardContent} />
                    </div>
                ) : ""
            }
            {
                stage >= 0 ? (
                    <div className='card-creator-top'>
                        <input ref={nameInput} 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    descInput.current.focus();
                                }
                            }} placeholder='Task name' className="card-creator-main-h1" />
                        <textarea ref={descInput} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                updateStage(Math.max(stage, 1));
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
            {
                stage >= 2 ? (
                    <div className='show-amination card-creator-buckets'>
                        {targets.map(target)}
                    </div>
                ) : ''
            }
            {
                stage >= 2 ? (
                    <div className='show-amination card-creator-panel'>
                        <button onClick={() => {
                            const name = nameInput.current.value;
                            const desc = descInput.current.value;

                            if (initialized) {
                                cardManager.updateCard(
                                {
                                    id : editTask.id,
                                    name, 
                                    desc, 
                                    bucket: choosenBucket, 
                                    parent :  parentCardContent ? parentCardContent.id : null,
                                    tags : targets.filter(e => e.selected).map(e => e.id)
                                });
                            } else {
                                cardManager.addCard(
                                    name, 
                                    desc, 
                                    choosenBucket, 
                                    parentCardContent ? parentCardContent.id : null,
                                    targets.filter(e => e.selected).map(e => e.id)
                                );
                            }

                            navigate('/main');

                        }} className='add-card-button'>Create</button>
                    </div>
                ) : ""
            }
            {
                stage == 1 && !initialized ? (
                    <div className='show-amination card-creator-panel'>
                        <button onClick={() => {
                            const name = nameInput.current.value;
                            const desc = descInput.current.value;

                            cardManager.addInbox(
                                name, 
                                desc,
                                parentCardContent ? parentCardContent.id : null,
                            );

                            navigate('/main');

                        }} className='add-card-button-black'>To inbox</button>
                    </div>
                ) : ""
            }
        </div>
    );
}
