import CoinImage from "../../assets/images/coin.svg"
import { useState, useEffect } from "react"
import DraggableContainer from "./draggableContainer"
import { connect } from "react-redux"
import React from "react"
import ReactDOM from "react-dom"

import CoinImage1 from "../../assets/images/coin-1.svg"
import CoinImage2 from "../../assets/images/coin-2.svg"
import CoinImage3 from "../../assets/images/coin-3.svg"
import CoinImage4 from "../../assets/images/coin-4.svg"

function CoinItem({ value, quantity, coins, addCoin, isEmpty, setCoins, pushCoinPosition, disableDrag }) {
    const [image, setImage] = useState(CoinImage)

    useEffect(()=>{
        switch (value) {
            case 0.20:
                setImage(CoinImage4)
                break;
            case 0.10:
                setImage(CoinImage3)
                break;
            case 0.05:
                setImage(CoinImage2)
                break;
            case 0.01:
                setImage(CoinImage1)
                break;
            default:
                break;
        }

    }, [])

    function onDragStart(e) {
        console.log("Started dragging!")
    }

    function onDrag(e) {

    }

    function onDragStop(e) {
        //console.log(e.clientX - e.target.getBoundingClientRect().left)
        const coinEl = e.target.getBoundingClientRect()
        const rect = document.getElementById("drop-target").getBoundingClientRect()
        // console.log("Coin left:"+coinEl.left + "    drop x: "+rect.x+"    drop x(end) = "+(rect.x+rect.width))
        // console.log("Coin top:"+coinEl.top+"     drop y: "+rect.y)

        //the coordinates of the center of the coin 
        const coinPosX = coinEl.left + coinEl.width/2
        const coinPosY = coinEl.top + coinEl.height/2

        if (coinPosX >= rect.x && coinPosX <= rect.x + rect.width-20 && coinPosY <= rect.y + rect.height && coinPosY >= rect.y-100 && isEmpty()) {
            
            let relativeXPos = coinEl.left-rect.left+15
            let relativeYPos = coinEl.top-rect.top
            // console.log(relativeXPos)

            //offset the position to fit the jar
            if(relativeXPos < 15) relativeXPos=30

            if(relativeXPos > rect.width-coinEl.width) {
                console.log("Offsetting")
                relativeXPos=rect.width-coinEl.width-10
            }
            addCoin(value)
            pushCoinPosition(value, relativeXPos, relativeYPos)

        } else {
            //do not update state and revert drag
            console.log("Not adding a coin")
            setCoins([...coins])
        }

    }

    const spanStyle = quantity > 0 ? "bg-blue-400" : "bg-blue-200"

    return (
        <>

            <div className="relative">




                <div className="absolute top-0 left-0">
                    <img src={image} className="top-0 left-0 pointer-events-none" draggable="false" />
                </div>


                <DraggableContainer onStart={onDragStart} onDrag={onDrag} onStop={onDragStop} disabled={disableDrag}>
                    <div className="relative">
                        <img src={image} className="z-10 pointer-events-none" onDrag={e => e.preventDefault()} />
                    </div>
                </DraggableContainer>

                <span className={"absolute rounded-full w-8 h-8 text-center py-1 "+spanStyle} style={{ bottom: -8, right: -10 }}>
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
