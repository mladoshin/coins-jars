import JarIcon from "../../assets/images/jar.svg"
import ClosedJarIcon from "../../assets/images/jar-closed.jpg"
import { connect } from "react-redux"
import CoinImage from "../../assets/images/coin.svg"
import { useEffect, useState } from "react"

function JarItem({ type, addCoin, coins, id, results, openModal, coinsPos }) {
    const width = type == "sm" ? "w-40" : "w-64"
    const [closed, setClosed] = useState(false)
    const [coinsItems, setCoinsItem] = useState([])

    //experimantal feature
    useEffect(() => {
        if (coins?.length && type=="sm") {
            const temp = coinsItems
            const left = Math.random()*100+50
            temp.push(left)
            setCoinsItem([...temp])
        }

    }, [coins])

    useEffect(()=>{
        console.log(coinsItems)
    }, [coinsItems])



    useEffect(() => {
        if (results[id]?.totalValue) {
            setClosed(true)
        } else {
            setClosed(false)
        }
    }, [results])

    const handleClick = () => {

        closed && openModal(id)
    }

    function CoinImg({left, index}) {
        const classname = coinsPos.length==index+1 ? "jar-coin-item" : ""
        return (
            <div className={"absolute bottom-2 "+classname} style={{ left: left ? left : 50}}>
                <img src={CoinImage} className="w-16 h-16 top-0 left-0 pointer-events-none" draggable="false" />
            </div>
        )
    }


    return (
        <div className="flex flex-col items-center" >
            <div id={type !== "sm" && "drop-target"} className="relative">
                <img src={closed ? ClosedJarIcon : JarIcon} className={width} draggable="false"/>
                {coinsPos?.map((pos, index) => {
                    return (
                        <CoinImg left={pos.left} index={index}/>
                    )
                })}

            </div>

            {type == "sm" && closed &&
                <div className="mt-4">
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
