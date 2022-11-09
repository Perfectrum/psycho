import './card.css';

import * as cardsManager from '../../logic/cards';
import { createRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function Card(props) {
    const { content, mode } = props;
    const { name, desc, tags } = content;

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
                    }, 200);
                }}>
                    {
                        mode === 'parent' ? (<img className='parent-icon-img' src='back.png' />) :
                        mode === 'todo' ? (<img src='to_progress.png' />) :
                        mode === 'progress' ? (<img src='check_free.png' />) :
                        mode === 'done' ? (<img src='check.png' />) : ""
                    }
                </div>
                {
                    mode !== 'done' && mode !== 'parent' ? 
                    ( <div
                        onClick={() => {
                            navigate('/create', {
                                state : { parentContent : content }
                            });
                        }}
                        className='task-table-add-action'
                      >
                            <img src='add.png' />
                      </div>
                    ) : ""
                }
            </div>
            <div>
                <div className='task-table-card-name'>{name}</div>
                {
                    mode !== 'done' ?
                    (
                    <div>
                        <div className='task-table-card-desc'>{desc}</div>
                    </div> 
                    ) : ""
                }
                <div className='task-table-card-info'>
                    <div className='task-table-card-info-tag'>
                        <img src="./star.png"></img>
                        Win hackaton
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
