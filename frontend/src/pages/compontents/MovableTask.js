import './movableTask.css'
import React, { useState } from "react";
import { DragMove } from "./DragMove";


export function MovableTask(title) {
    const [translate, setTranslate] = useState({
        x: 0,
        y: 0
      });
    
      const handleDragMove = (e) => {
        setTranslate({
          x: translate.x + e.movementX,
          y: translate.y + e.movementY
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
                {title}
              </div>
            </DragMove>
        </div>
      );
}