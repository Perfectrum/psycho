import { useNavigate } from 'react-router-dom';
import './inbox.css';

export function Inbox(props) {
    const { content } = props;
    const { id, name, desc } = content;

    const navigate = useNavigate()

    return (
        <div className="inbox-card" onClick={() => {
            navigate('/create/task', {
                state : { editTask : { id, name, desc } }
            })
        }}>
            <div className='inbox-card-right'>
                {name}
            </div>
            <div className="inbox-center-card">
                <div className="inbox-desc">
                    {desc} 
                </div>                
            </div> 
        </div>
    );
}
