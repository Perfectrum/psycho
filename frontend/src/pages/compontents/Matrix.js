import { useEffect, useState } from 'react';
import './matrix.css';
import { MovableTask } from './MovableTask'
import * as cardsManager from '../../logic/cards';
import * as connector from '../../logic/connector';

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

    const [ cards, loadCards ] = useState([[], [], []]);

    useEffect(() => {
        console.log("MATRIX EFFECT");
        loadCards(cardsManager.getCards());
    }, []);

    connector.onMsg(() => {
        loadCards(cardsManager.getCards());
    });

    const flat = [];
    for (const c of cards) {
        for (const i of c) {
            flat.push(i);
        }
    }

    return (
        <div>
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

                { flat.map(e => <MovableTask card={e} key={e.id} label={e.name} fieldWidth={500} fieldHeight={300} importance={e.importance} urgency={e.urgency} />) }
            </div>           
            <div className='show-amination card-creator-panel'>
                <button onClick={() => {
                    for (const c of flat) {
                        cardsManager.updateCoords(c);
                    }
                }} className='add-card-button-black'>Save</button>
            </div>
        </div> 
    );
}