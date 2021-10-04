import React from 'react';
import ReactDOM from 'react-dom';
import Draggable, { DraggableCore } from 'react-draggable';
import {useState, useRef} from "react"

function DraggableContainer({children, onStart, onDrag, onStop}) {

    return (
        <Draggable onStart={onStart} onStop={onStop} onDrag={onDrag}>
            {children}
        </Draggable>
    )
}

export default DraggableContainer
