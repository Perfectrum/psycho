import './card.css';

import * as cardsManager from '../../logic/cards';
import { createRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function Card(props) {
    const { content, mode } = props;
    const { name, desc, bucket, hasChild, parent, fullName, tags } = content;

    const navigate = useNavigate();

    const animClass =  mode === 'todo' ? 'jump-anim' : 
                       mode === 'progress' ? 'rot-anim' : '';

    const meElem = createRef();

    return (
        <div ref={meElem} 
            className={`${mode ==='parent' ? 'card-without-border' :  'card-with-border'} ${mode !== 'parent' ? 'wake-up-anim' : ''}`}
            >
            <div className='task-table-card-right'>
                <div className={`task-table-card-action ${animClass}`} onClick={() => {
                    if (mode !== 'done' && mode !== 'parent') {
                        meElem.current.classList.remove('wake-up-anim');
                        meElem.current.classList.add('hide-down-anim');
                    }

                    setTimeout(() => {
                        cardsManager.move(content);
                    }, 150);
                }}>
                    {
                        mode === 'parent' ? (<img className='parent-icon-img' src='/back.png' />) :
                        mode === 'todo' ? (<img src='/to_progress.png' />) :
                        mode === 'progress' ? (<img src='/check_free.png' />) :
                        mode === 'done' ? (<img src='/check.png' />) : ""
                    }
                </div>
                {
                    mode !== 'done' && mode !== 'parent' && bucket !== cardsManager.BUCKETS.quant ? 
                    ( <div
                        onClick={() => {
                            navigate('/create', {
                                state : { parentContent : content }
                            });
                        }}
                        className='task-table-add-action'
                      >
                            <img src='/add.png' />
                      </div>
                    ) : ""
                }
                {
                    mode !== 'todo' &&  mode !== 'parent' ?
                    (
                        <div onClick={() => {
                            if (mode !== 'done' && mode !== 'parent') {
                                meElem.current.classList.remove('wake-up-anim');
                                meElem.current.classList.add('hide-not-down-anim');
                            }
        
                            setTimeout(() => {
                                cardsManager.moveBack(content);
                            }, 150);
                        }} className='task-table-go-back-action'>
                            <img src='/back_arrow.png' />
                        </div>
                    ) : ""
                }
            </div>
            <div>
                <div className='task-table-card-name'>
                    {name}
                </div>
                {   fullName.length ?
                        (
                        <div className='task-table-card-path'>
                            {fullName.map((e, i) => 
                                <span key={`${e}-${i}`} className='card-indicator'>
                                    {`--> ${e}`}
                                </span>
                            )}
                        </div>) : ""
                    }
                {
                    mode !== 'done' ?
                    (
                    <div>
                        <div className='task-table-card-desc'>{desc}</div>
                    </div> 
                    ) : ""
                }
                <div className='task-table-card-info'>
                    {
                        tags.length ? 
                        tags.map((e, i) => (
                            <div key={i} onClick={() => cardsManager.setGoalFilter(e)} className='task-table-card-info-tag task-table-card-info-tag-goal'>
                                <img src="/star.png"></img> {e}
                            </div>
                        )) : (
                            <div className='task-table-card-info-tag'>
                                <img src="/cancel.png"></img> No goal
                            </div>
                        )
                    }
                    <div className='task-table-card-info-tag'>
                        <img src="/book.png"></img>
                        {bucket}
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
