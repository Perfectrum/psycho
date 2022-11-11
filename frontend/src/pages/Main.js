import { useNavigate, Outlet, Link } from "react-router-dom";
import { CardField } from "./compontents/CardField";
import { Goals } from './Goals';
import { Matrix } from "./compontents/Matrix";
import "./main.css"
import * as cardsManager from '../logic/cards';
import { useEffect, useState } from "react";

import * as connector from '../logic/connector';


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

function listMenuItem(imagepath, name, href, action) {
    return ( 
        <Link onClick={() => { if (action) action(); }} className={`${action ? 'right-align' : ''} left-menu-list-item`} to={href}>
            <img src={imagepath}/>
        </Link>
    );
}

export function MatrixPanel(){
    return ( <Matrix/> );
}

export function BoardPanel() {

    const [ cards, loadCards ] = useState(cardsManager.getCards());
    
    cardsManager.onChange(() => {
        loadCards(cardsManager.getCards());
    });

    connector.onMsg(() => {
        loadCards(cardsManager.getCards());
    });

    const [ topButtons, updateTopButtons ] = useState([
        packTopButton("Все", null, true),
        packTopButton("Квант", cardsManager.BUCKETS.quant, false),
        packTopButton("День", cardsManager.BUCKETS.day, false),
        packTopButton("Неделя", cardsManager.BUCKETS.week, false),
        packTopButton("Месяц", cardsManager.BUCKETS.month, false),
        packTopButton("Год", cardsManager.BUCKETS.year, false)
    ]);

    function horizonMenuItem(button, idx) {
        const { name, value, selected } = button;
        return ( <div key={idx} onClick={() => {
            for (const btn of topButtons) {
                btn.selected = false;
            }
            button.selected = true;
            cardsManager.setFilter(value);
            updateTopButtons([...topButtons]);
        }} className={`${selected ? "main-page-tab-selected" : ""} main-page-tabs-list-item`}>{name}</div>)
    }

    return (
        <div className="main-page-big-width">
            <div className="main-page-tabs-list">
                {topButtons.map(horizonMenuItem)}
            </div>
            <div className="main-page-card-list">
                <CardField content={cards[0]} type='done' />
                <CardField content={cards[1]} type='progress' />
                <CardField content={cards[2]} type='todo' />
            </div>
        </div>
    );
}

export function GoalPanel() {
    return (<Goals />);
}

export  function Main() {

    const [ counter, setCounter ] = useState(0);

    useEffect(() => {
        connector.initilize();
        connector.onMsg(() => {
            setCounter(counter + 1);
        })
    });

    const navigate = useNavigate();

    return ( 
        <div className="flex-container">
            <div onClick={() => {
                    if (window.location.href.includes('goals')) {
                        navigate('/create/goal');
                    } else {
                        navigate('/create');
                    }
                }
                } className="add-button">
                +
            </div>            
            <div className="center">
                <div className="items">
                        { listMenuItem("/inbox.png",'', 'inbox') }
                        { listMenuItem("/matrix.png", '', 'matrix') }
                        { listMenuItem("/goals.png",'', 'goals') }
                        { listMenuItem("/list.png", '', 'board') }
                        { listMenuItem("/logout.png", '', '/', () => {
                            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            window.location.href = '/';
                        }) }
                 </div>
                <div className="main-page-content">
                    <Outlet counter={counter} />
                </div>
                <div style={{display : 'none'}}>{counter}</div>
            </div>
        </div>
    );
}
