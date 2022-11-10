import './goal.css';

import './goalField.css';

import { Goal } from "./goal";


export function GoalField() {
    return (
        <div className="goal-field">
            <Goal content={{ 
                name : "Create goal model",
                desc : "A lot of usefull words about task"
            }} />
             <Goal content={{ 
                name : "Create card model",
                desc : "A lot of usefull words about task"
            }} />
             <Goal content={{ 
                name : "Create card model",
                desc : "A lot of usefull words about task"
            }} />
             <Goal content={{ 
                name : "Create card model",
                desc : "A lot of usefull words about task"
            }} />
             <Goal content={{ 
                name : "Create card model",
                desc : "A lot of usefull words about task"
            }} />
            <Goal content={{ 
                name : "Create card model",
                desc : "A lot of usefull words about task"
            }} />
        </div>
    );
}