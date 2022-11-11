import './goalField.css';

import { Goal } from "./Goal";
import * as cardManager from '../../logic/cards';
import * as connector from '../../logic/connector';
import { useState } from 'react';


export function GoalField() {

    const [ goals, updateGoals ] = useState(cardManager.getGoals());

    connector.onMsg(() => {
        updateGoals(cardManager.getGoals());
    });

    return (
        <div className="goal-field">
            { goals.map(e => <Goal key={e.id} content={{ 
                name : e.name,
                desc : e.desc
            }} />) }

        </div>
    );
}