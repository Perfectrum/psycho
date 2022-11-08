import "./main.css"

export function Main() {

    function horizonMenuItem(name) {
        return ( <li><button className="listMenuItem">{name}</button></li> )
    }

    function listMenuItem(name, href) {
        return ( <a href={href}>{name}</a> )
    }

    return ( 
        <div className="flex-container">
            <div id="left_menu">
                <div className="items">
                    { listMenuItem('Входящие', 'inbox') }
                    { listMenuItem('Цели', '') }
                    { listMenuItem('Бэклог', '') }
            </div>
            
            </div>
            <div id="center">
            <ul>
                { horizonMenuItem('ЭКД', '#') }
                { horizonMenuItem('День', '#') }
                { horizonMenuItem('Неделя', '#') }
                { horizonMenuItem('...', '#') }
                { horizonMenuItem('+', '#add_horizon') }
            </ul>
            
            
            </div>
            <div id="right_bar">
                <button id="avatar" className="user"></button>
            </div>
        </div>
    );
}