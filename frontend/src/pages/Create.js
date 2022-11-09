import { useNavigate } from "react-router-dom";
import { CardCreator } from "./compontents/CardCreator";


export function Create() {

    const navigate = useNavigate();

    return (
        <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems: 'center'}}>
            <div 
                className='card-creator-close'
                onClick={() => navigate('/main')}
            ><img src="close.png" /></div>
            <CardCreator />
        </div>
    )
}
