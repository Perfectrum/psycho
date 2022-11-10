import { useNavigate } from "react-router-dom";
import { CardField } from "./compontents/CardField";
import "./main.css"

import * as cardsManager from '../logic/cards';
import { useState } from "react";


function packTopButton(name, value, selected) {
    return {
        name,
        value,
        selected
    }
}

function horizonMenuItem(name, selected) {
    return ( <div data-tooltip={name == 'ЭКД' ? "Квант" : ""} className={`${selected ? "main-page-tab-selected" : ""} main-page-tabs-list-item`}>{name}</div>)
}

function listMenuItem(imagepath, name, href) {
    return ( <div className="left-menu-list-item"> <img src={imagepath}/>
    <a href={href}>{name}</a></div> )
}

export function Main() {

    const [ counter, updateCounter ] = useState(0);
    const [ topButtons, _ ] = useState([
        packTopButton("Все", null, true),
        packTopButton("Квант", cardsManager.BUCKETS.quant, false),
        packTopButton("День", cardsManager.BUCKETS.day, false),
        packTopButton("Неделя", cardsManager.BUCKETS.week, false),
        packTopButton("Месяц", cardsManager.BUCKETS.month, false),
        packTopButton("Год", cardsManager.BUCKETS.year, false)
    ]);


    function forceUpdate() {
        updateCounter(counter + 1);
    }

    const cards = cardsManager.getCards();
    const navigate = useNavigate();

    cardsManager.callback(forceUpdate);

    function horizonMenuItem(button, idx) {
        const { name, value, selected } = button;
        return ( <div key={idx} onClick={() => {
            for (const btn of topButtons) {
                btn.selected = false;
            }
            button.selected = true;
            cardsManager.setFilter(value);
        }} data-tooltip={name == 'Квант' ? "Минимальный промежуток времени (обычно ~20 минут)" : ""} className={`${selected ? "main-page-tab-selected" : ""} main-page-tabs-list-item`}>{name}</div>)
    }

    return ( 
        <div className="flex-container">
            <div onClick={() => navigate('/create')} className="add-button">
                +
            </div>
            {
            // <div className="left-menu">
            //         <div className="items">
            //          { listMenuItem("inbox.png",'Входящие', 'inbox') }
            //          { listMenuItem("matrix.png", 'Матрица', 'matrix') }
            //          { listMenuItem("goals.png",'Цели', 'goals') }
            //          { listMenuItem("list.png", 'Задачи', 'main') }
            //      </div>
            // </div>
            }
            
            <div className="center">
                <div className="main-page-tabs-list">
                    {topButtons.map(horizonMenuItem)}
                </div>
                <div className="main-page-content">
                    <div className="main-page-card-list">
                       <CardField content={cards[0]} type='done' />
                       <CardField content={cards[1]} type='progress' />
                       <CardField content={cards[2]} type='todo' />
                    </div>
                </div>
            </div>
        <div style={{display: 'none'}}>{counter}</div>
        </div>
    );
}