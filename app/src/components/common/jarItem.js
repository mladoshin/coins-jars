import JarIcon from "../../assets/images/jar.svg"
import ClosedJarIcon from "../../assets/images/jar-closed.jpg"
import { connect } from "react-redux"
import CoinImage from "../../assets/images/coin.svg"
import { useEffect, useState } from "react"

function JarItem({ type, addCoin, coins, id, results, openModal }) {
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



    useEffect(() => {
        if (results[id]?.totalValue) {
            setClosed(true)
        } else {
            setClosed(false)
        }
    }, [results])

    const onDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        //console.log(e)
    }

    const onDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        //console.log(e)

    }

    const handleClick = () => {

        closed && openModal(id)
    }

    function CoinImg({left}) {
        return (
            <div className="absolute bottom-0" style={{ left: left ? left : 50}}>
                <img src={CoinImage} className="w-16 h-16 top-0 left-0 pointer-events-none" draggable="false" />
            </div>
        )
    }

    const coinList = []

    coins?.map((coin, index) => {
        let coinsCollection = []
        if (type !== "sm") {
            for (let i = 0; i < coin.quantity; i++) {
                coinsCollection.push(<CoinImg left={coinsItems[i*(index+1)]}/>)
            }
        }
        const collection = (
            <>
                {[...coinsCollection]}
            </>
        )
        coinList.push(collection)
    })


    return (
        <div className="flex flex-col items-center">
            <div onDragOver={onDragOver} id={type !== "sm" && "drop-target"} onDrop={onDrop} className="relative">
                <img src={closed ? ClosedJarIcon : JarIcon} className={width} />
                {coinList.map(el => {
                    return el
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
