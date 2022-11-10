import { useNavigate } from "react-router-dom";
import { CardField } from "./compontents/CardField";
import "./main.css"

import * as cardsManager from '../logic/cards';
import { useState } from "react";

export function Main() {

    const [ counter, updateCounter ] = useState(0);
    
    function forceUpdate() {
        updateCounter(counter + 1);
    }

    const cards = cardsManager.getCards();
    const navigate = useNavigate();

    cardsManager.callback(forceUpdate);

    function horizonMenuItem(name, selected) {
        return ( <div data-tooltip={name == 'ЭКД' ? "Квант" : ""} className={`${selected ? "main-page-tab-selected" : ""} main-page-tabs-list-item`}>{name}</div>)
    }

    function listMenuItem(imagepath, name, href) {
        return ( <div className="left-menu-list-item"> <img src={imagepath}/>
        {name}</div> )
    }

    return ( 
        <div className="flex-container">
            <div className="add-button">
                +
                <div className="add-button-menu">
                    <div onClick={() => navigate('/create')} className="add-button-menu-item">Цель</div>
                    <div onClick={() => navigate('/create')} className="add-button-menu-item">Задача</div>
                </div>
            </div>
            {
            <div className="left-menu">
                    <div className="items">
                     { listMenuItem("inbox.png",'Входящие', '') }
                     { listMenuItem("matrix.png", 'Матрица', '') }
                     { listMenuItem("goals.png",'Цели', '') }
                     { listMenuItem("list.png", 'Задачи', '') }
                 </div>
            </div>
            }
            <div className="center">
                <div className="main-page-tabs-list">
                    {horizonMenuItem("ЭКД", 's')}
                    {horizonMenuItem("День")}
                    {horizonMenuItem("Неделя")}
                    {horizonMenuItem("Месяц")}
                </div>
                <div className="main-page-content">
                    <div className="main-page-card-list">
                        { cards[0].length ? <CardField content={cards[0]} type='done' /> : "" }
                        { cards[1].length ? <CardField content={cards[1]} type='progress' /> : "" }
                        { cards[2].length ? <CardField content={cards[2]} type='todo' /> : "" }
                    </div>
                </div>
            </div>
            {
                /*
            <div className="right-bar">

                <div className="user">
                    E
                </div> 
            </div>
            */""
            }
        <div style={{display: 'none'}}>{counter}</div>
        </div>
    );
}