import CoinItem from "./common/coinItem"
import {connect} from "react-redux"
import Button from "./common/button"

function CoinList({ coins, addCoin }) {
    //console.log(coins)
    return (
        <div className="flex flex-row w-10/12 justify-between mx-auto py-8">
            {
                coins?.map((coin, index) => {
                    return (
                        <CoinItem key={index} value={coin.value} quantity={coin.quantity} addCoin={addCoin} />
                    )
                })
            }
        </div>

    )
}

function JarContent({results, jarId, setCurrentJar, setCoins, setResults, setOpen}) {
    const res = jarId>=0 ? Object.values(results[jarId]) : null
    const coins = []
    res?.map(r => {
        if (typeof r == "object"){
            coins.push(r)
        }
    })
    
    console.log(jarId)

    function handleRedo(){
        setCurrentJar({index: jarId})
        setCoins(coins)

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
