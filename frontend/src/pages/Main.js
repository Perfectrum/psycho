import { CardCreator } from "./compontents/CardCreator";
import { CardField } from "./compontents/CardField";
import "./main.css"

export function Main() {

    function horizonMenuItem(name, selected) {
        return ( <div className={`${selected ? "main-page-tab-selected" : ""} main-page-tabs-list-item`}>{name}</div>)
    }

    function listMenuItem(name, href) {
        return ( <div className="left-menu-list-item">{name}</div> )
    }

    return ( 
        <div className="flex-container">
            <div className="left-menu">
                {
                /*
                    <div className="items">
                     { listMenuItem('🏠', '') }
                     { listMenuItem('✏️', '') }
                     { listMenuItem('📭', '') }
                     { listMenuItem('🌟', '') }
                     { listMenuItem('📚', '') }
                 </div>
                 */ ""
                }
            </div>
            <div className="center">
                <div className="main-page-tabs-list">
                    {horizonMenuItem("ЭКД", 's')}
                    {horizonMenuItem("День")}
                    {horizonMenuItem("Неделя")}
                    {horizonMenuItem("Месяц")}
                </div>
                <div className="main-page-content">
                    <CardField />
                </div>
            </div>
            <div className="right-bar">
                {
                /*
                <div className="user">
                    E
                </div> */
                ""
                }
            </div>
        </div>
    );
}