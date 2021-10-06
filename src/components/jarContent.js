import CoinItem from "./common/coinItem"
import {connect} from "react-redux"
import Button from "./common/button"

function CoinList({ coins, addCoin }) {
    //console.log(coins)
    return (
        <div className="flex flex-row md:w-10/12 justify-between mx-auto py-8 items-end sm:w-full">
            {
                coins?.map((coin, index) => {
                    return (
                        <div className="px-2 md:px-0">
                            <CoinItem key={index} value={coin.value} quantity={coin.quantity} addCoin={addCoin} disableDrag={true}/>
                        </div>
                    )
                })
            }
        </div>

    )
}

function JarContent({results, jarId, setCurrentJar, setCoins, setResults, setOpen, setCoinsPos}) {
    const res = jarId>=0 ? Object.values(results[jarId]) : null

    const coins = []
    res?.map(r => {
        console.log(r)
        if (typeof r == "object" && r.quantity+1){
            coins.push(r)
        }
    })
    
    console.log(jarId)

    function handleRedo(){
        setCurrentJar({index: jarId})
        setCoins(coins)

        //copy coin position
        setCoinsPos(results[jarId]?.coinsPos)
        
        const results_copy = [...results]
        results_copy[jarId] = {}
        setResults([...results_copy])
        setOpen({})
    }

    return (
        <div className="flex flex-col items-center">
            
            <CoinList coins={coins}/>
            <Button onClick={handleRedo}>Redo</Button>

            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        results: state.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setResults: (val) => dispatch({ type: "SET_RESULTS", payload: val }),
        setCurrentJar: (val) => dispatch({ type: "SET_CURRENT_JAR", payload: val })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JarContent)
