// import { createRef } from 'react';
// import { useNavigate } from 'react-router-dom'
import './matrix.css';

function matrixDecorItem(text, id) {
    return (
        <div className="matrixDecor" id={id}>{text}</div>
    );
}

export function Matrix() {

    return (
        <div className="matrix">
            <div className="emoji" id="fire">🔥</div>
            <div className="emoji" id="sparkles">✨</div>
            <div className="matrixBackground">
                <div className="separator horizontalSeparator"></div>
                <div className="separator verticalSeparator"></div>
                { matrixDecorItem("ASAP", "asap") }
                { matrixDecorItem("EARLIER THE BETTER!", "earlierBetter") }
                { matrixDecorItem("TO DO OR NOT TO DO...", "doOrNo") }
            </div>
        </div>
    );
}
