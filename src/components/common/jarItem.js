import JarIcon from "../../assets/images/jar.svg"
import ClosedJarIcon from "../../assets/images/closed-jar.svg"
import JarSMIcon from "../../assets/images/jar-sm.svg"
import { connect } from "react-redux"
import CoinImage from "../../assets/images/coin.svg"
import { useEffect, useState } from "react"
import { motion, useMotionValue  } from "framer-motion";

import CoinImage1 from "../../assets/images/coin-1.svg"
import CoinImage2 from "../../assets/images/coin-2.svg"
import CoinImage3 from "../../assets/images/coin-3.svg"
import CoinImage4 from "../../assets/images/coin-4.svg"

function JarItem({ type, coins, id, results, openModal, coinsPos, isFilled, controls }) {
    const width = type == "sm" ? "w-40" : "w-64"
    const [closed, setClosed] = useState(false)
    const [coinsItems, setCoinsItem] = useState([])
    const [flag, setFlag] = useState(false)

    const [jarImage, setJarImage] = useState(JarIcon)

    useEffect(() => {
        if (isFilled) {
            setJarImage(ClosedJarIcon)
            return
        }
        if (type !== "sm") {
            setJarImage(JarIcon)
        } else {
            setJarImage(JarSMIcon)
        }
    }, [])

    //experimantal feature
    useEffect(() => {
        setFlag(true)
    }, [coinsPos])

    useEffect(() => {
        setFlag(false)
    }, [coins])



    useEffect(() => {
        if (results[id]?.totalValue) {
            setClosed(true)
            setJarImage(ClosedJarIcon)
        } else {
            setClosed(false)
            if (type == "sm") {
                setJarImage(JarSMIcon)
            }
        }
    }, [results])

    const handleClick = () => {

        closed && openModal(id)
    }

    function CoinImg({ left, index, val, top }) {
        // const classname = coinsPos.length == index + 1 && flag ? "jar-coin-item" : ""
        const [image, setImage] = useState()
        const dropTarget = document.getElementById("drop-target").getBoundingClientRect()
        // const el = document.getElementById("coinItem-"+index).getBoundingClientRect()

        const animation = coinsPos.length == index + 1 && flag ? {bottom: 20, animationFillMode: "forwards"} : {}
        const initial = coinsPos.length == index + 1 && flag ? {bottom: dropTarget.height-Math.abs(top)-55} : {}


        useEffect(() => {
            switch (val) {
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
                    setImage(CoinImage)
                    break;
            }
        }, [])

        return (
            <motion.div className={"absolute coinItem"} style={{ left: left, bottom: 20 }} id={"coinItem-"+index} initial={initial} animate={animation} transition={{duration: 0.5}} >
                <img src={image} className="top-0 left-0 pointer-events-none" draggable="false" />
            </motion.div>
        )
    }


    return (
        <div className="flex flex-col items-center" >
            <div className="relative px-4">
                <img src={jarImage} className={width} draggable="false" id={type !== "sm" && "drop-target"} />
                {coinsPos?.map((pos, index) => {
                    return (
                        <CoinImg left={pos.left} index={index} val={pos.val} top={pos.top} />
                    )
                })}

            </div>

            {controls !== false &&
                <div className="mt-4 px-4 text-center" style={{ visibility: type == "sm" && closed ? "visible" : "hidden" }}>
                    <a className="underline text-blue-500 font-bold cursor-pointer" onClick={handleClick}>Double check</a>
                </div>
            }


        </div>
    )
}

const mapStateToProps = state => {
    return {
        results: state.results
    }
}

export default connect(mapStateToProps, null)(JarItem)
