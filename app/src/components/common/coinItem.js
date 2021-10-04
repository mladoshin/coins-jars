import CoinImage from "../../assets/images/coin.svg"
import { useState, useEffect } from "react"
import DraggableContainer from "./draggableContainer"
import { connect } from "react-redux"
import React from "react"
import ReactDOM from "react-dom"

function CoinItem({ value, quantity, coins, addCoin, isEmpty, setCoins }) {

    function onDragStart(e) {
        console.log("Started dragging!")
    }

    function onDrag(e) {

    }

    function El() {
        return (
            <div className="absolute bottom-0 left-10">
                <img src={CoinImage} className="w-16 h-16 top-0 left-0 pointer-events-none" draggable="false" />
            </div>
        )
    }
    function onDragStop(e) {
        console.log("Stopped dragging!")

        const rect = document.getElementById("drop-target").getBoundingClientRect()
        console.log(e.clientX, e.clientY)
        console.log(rect.x, rect.y)
        if (e.clientX >= rect.x && e.clientX <= rect.x + rect.width && e.clientY <= rect.y + rect.height / 2 && e.clientY >= rect.y + rect.height / 2 - 200 && isEmpty()) {

            addCoin(value)

            //document.getElementById("drop-target").appendChild(El)

        } else {
            //do not update state and revert drag
            console.log("Not adding a coin")
            setCoins([...coins])
        }

    }

    return (
        <>

            <div className="relative">




                <div className="absolute top-0 left-0">
                    <img src={CoinImage} className="w-16 h-16 top-0 left-0 pointer-events-none" draggable="false" />
                </div>


                <DraggableContainer onStart={onDragStart} onDrag={onDrag} onStop={onDragStop}>
                    <div className="relative">
                        <img src={CoinImage} className="w-16 h-16 z-0 pointer-events-none" onDrag={e => e.preventDefault()} />
                    </div>
                </DraggableContainer>

                <span className="absolute bg-blue-300 rounded-full w-8 h-8 text-center" style={{ bottom: -8, right: -10 }}>
                    <h1 className="text-white">x{quantity}</h1>
                </span>

            </div>


        </>
    )
}

const mapStateToProps = state => {
    return {
        currentJar: state.currentJar
    }
}

export default connect(mapStateToProps)(CoinItem)
