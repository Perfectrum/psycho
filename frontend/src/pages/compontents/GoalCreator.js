import { createRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './goalCreator.css';
import * as cardManager from '../../logic/cards';

export function GoalCreator() {

    const [ stage, updateStage ] = useState(0);

    const navigate = useNavigate();

    const nameInput = createRef();
    const descInput = createRef();

    return (
        <div className="card-creator-main">
            {
                stage >= 0 ? (
                    <div className='card-creator-top'>
                        <input ref={nameInput} 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    descInput.current.focus();
                                }
                            }} placeholder='Goal name' className="card-creator-main-h1" />
                        <textarea ref={descInput} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                updateStage(Math.max(stage, 1));
                            }
                        }} placeholder='Goal description' className='card-creator-description'/>
                    </div>
                ) : ""
            }
            {
                stage >= 1 ? (
                    <div className='show-amination card-creator-panel'>
                        <button onClick={() => {
                            const name = nameInput.current.value;
                            const desc = descInput.current.value;

                            cardManager.addGoal(
                                name, 
                                desc
                            );

                            navigate('/main/goals');

                        }} className='add-card-button'>Create</button>
                    </div>
                ) : ""
            }
        </div>
    );
}
