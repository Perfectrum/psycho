import './goal.css';

export function Goal(props) {
    const { content } = props;
    const { name, desc } = content;

    return (
        <div className="goal-card">
            <div className='goal-card-right'>
                <img src="/star.png"/>
                {name}
            </div>
            <div className="goal-center-card">
                <div className="goal-desc">
                    {desc} 
                </div>                
            </div> 
        </div>
    );
}
