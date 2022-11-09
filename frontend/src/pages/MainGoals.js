import { Goal } from "./compontents/goal";
import { GoalField } from "./compontents/GoalField";


export function MainGoals() {
    return (
        <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems: 'center'}}>        
             <GoalField/>
             {/* <Goal content={{ 
                name : "Create card model",
                desc : "A lot of usefull words about task"
            }}/>  */}
        </div>
    )
}