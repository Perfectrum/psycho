import "./main.css"

export function Main() {

    function horizonMenuItem(name) {
        return ( <li><button>{name}</button></li> )
    }

    return ( 
        <div className="flex-container">
            <div id="left_menu">
                <div  className="items" >
                    <a href="#">Входящие</a>
                    <a href="#">Цели</a>
                    <a href="#">Задачи</a>
            </div>
            
            </div>
            <div id="center">
            <ul>
                { horizonMenuItem('ЭКД', '#') }
                { horizonMenuItem('День', '#') }
                { horizonMenuItem('Неделя', '#week') }
                { horizonMenuItem('...', '#other_horizons') }
                { horizonMenuItem('+', '#add') }
            </ul>
            
            
            </div>
            <div id="right_bar">
                <button id="avatar" className="user"></button>
            </div>
        </div>
    );
}