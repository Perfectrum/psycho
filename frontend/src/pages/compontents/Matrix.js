import './matrix.css';
import { MovableTask } from './MovableTask'


export function Test() {
    return (
        <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems: 'center'}}>
            <Matrix/>
        </div>
    );
}


function matrixDecorItem(text, id) {
    return (
        <div className="matrixDecor" id={id}>{text}</div>
    );
}

export function Matrix() {

    return (
        <div className="matrix">
            <div className="emoji" id="fire">🔥</div>
            <div className="importanceHeader">Срочно</div>
            <div className="arrow" id="horizontalArrow">{"< "}------------------------------------------- </div>
            <div className="urgencyHeader">Важно</div>
            <div className="arrow" id="verticalArrow">{"< "}---------------------------{" >"}</div>
            <div className="emoji" id="sparkles">✨</div>
            <div className="matrixBackground" id="matrixField">
                <div className="separator horizontalSeparator"></div>
                <div className="separator verticalSeparator"></div>
                { matrixDecorItem("ASAP", "asap") }
                { matrixDecorItem("EARLIER THE BETTER!", "earlierBetter") }
                { matrixDecorItem("TO DO OR NOT TO DO...", "doOrNo") }
            </div>

            { MovableTask("Геншин", 500, 300, 0.2, 0.25) }
            { MovableTask("Снять видео", 500, 300, 0.6, 0.4) }
            { MovableTask("Поспать", 500, 300, 0.8, 0.9) }
        </div>
    );
}