import "./main.css"

export function Main() {
    return ( 
    <div className="flex-container">
        <div id="left_menu">
             <div  className="items" > 
                <a href="#" className="active">Входящие</a>
                <a href="#">Цели 1</a>
                <a href="#">Задачи 2</a>
        </div>
        
        </div>
        <div id="center">
        <ul>
            <li><a className="active" href="#home">Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#about">About</a></li>
        </ul>
        
        
        </div>
        <div id="right_bar">
            <button id="avatar" className="user"></button>
        </div>
</div>
);
}
