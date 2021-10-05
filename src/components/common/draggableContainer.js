import React from 'react';
import ReactDOM from 'react-dom';
import Draggable, { DraggableCore } from 'react-draggable';
import {useState, useRef} from "react"

function DraggableContainer({children, onStart, onDrag, onStop, disabled}) {

    return (
        <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag} disabled={disabled} defaultClassNameDragged="z-50">
            {children}
        </Draggable>
    )
}

export default DraggableContainer
