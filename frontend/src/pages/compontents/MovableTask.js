import './movableTask.css'
import React, { useState } from "react";
import { DragMove } from "./DragMove";


export function MovableTask(props) {

  const { label, fieldWidth, fieldHeight, importance, urgency } = props;

    const [translate, setTranslate] = useState({
        x: fieldWidth * (1 - urgency),
        y: -fieldHeight * importance
      });
    
      const handleDragMove = (e) => {
        
        const oldX = translate.x;
        var newX = translate.x + e.movementX;
        newX = newX > 30 ? newX : oldX;
        newX = newX < fieldWidth-30 ? newX : oldX;

        const oldY = translate.y;
        var newY = translate.y + e.movementY;
        newY = newY < 30 ? newY : oldY;
        newY = newY > -(fieldHeight-30) ? newY : oldY;
        
        setTranslate({
          x: newX > 0 ? newX : oldX,
          y: newY < 0 ? newY : oldY
        });
      };
      
      return (
        <div>
            <DragMove onDragMove={handleDragMove}>
              <div className="movableTask"
                style={{
                  transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
                }}
              >
                <div className="taskIcon">🚀</div>
                <div className="taskLabel">{label}</div>
              </div>
            </DragMove>
        </div>
      );
}