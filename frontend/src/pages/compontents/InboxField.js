import './inboxField.css';

import { Inbox } from "./Inbox";
import * as cardManager from '../../logic/cards';
import * as connector from '../../logic/connector';
import { useState } from 'react';


export function InboxField() {

    const [ goals, updateGoals ] = useState(cardManager.getInbox());

    console.log('goals', goals);
    connector.onMsg(() => {
        updateGoals(cardManager.getInbox());
    });

    return (
        <div className="inbox-field">
            { goals.map(e => <Inbox key={e.id} content={{ 
                id : e.id,
                name : e.name,
                desc : e.desc
            }} />) }

        </div>
    );
}