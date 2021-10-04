import CoinItem from "./common/coinItem"
import JarItem from "./common/jarItem"
import Header from './header';
import Button from './common/button'
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import ModalWindow from "./common/modalWindow";
import JarContent from "./jarContent";
import ReviewAfterSubmitContent
 from "./reviewAfterSubmitContent";
const initCoinState = [
    { value: 0.20, quantity: 0 },
    { value: 0.10, quantity: 0 },
    { value: 0.05, quantity: 0 },
    { value: 0.01, quantity: 0 }
]

const answerValue = 0.56

function MainContainer({ results, setResults, currentJar, setCurrentJar, setOpenModal, modalOpen}) {
    const [coins, setCoins] = useState(initCoinState)
    const [totalValue, totalQuantity] = getValueAndQuantity()
    //const [modalOpen, setModalOpen] = useState({})

    useEffect(()=> {
        console.log(modalOpen?.type==="check")
    }, [modalOpen])

    function CoinList({ coins, addCoin, isEmpty }) {
        return (
            <div className="flex flex-col justify-between w-2/12 items-center">
                {
                    coins?.map((coin, index) => {
                        return (
                            <CoinItem key={index} value={coin.value} quantity={coin.quantity} addCoin={addCoin} isEmpty={isEmpty} coins={coins} setCoins={setCoins}/>
                        )
                    })
                }
            </div>

        )
    }

    function getValueAndQuantity() {
        let totValue = 0
        let totQuantity = 0
        coins.forEach(coin => {
            totValue += coin.value * coin.quantity
            totQuantity += coin.quantity
        })
        return [totValue, totQuantity]
    }

    function saveAnswer() {
        //console.log(coins)

        if (currentJar.index >= 0 && isEmpty()) {
            const currentResults = results
            const copyCoins = [...coins]
            currentResults[currentJar.index] = { ...copyCoins, totalValue, totalQuantity }
            setResults([...currentResults])

            setCurrentJar({ index: currentJar.index - 1 })
        } else {
            alert("Array index out of range!")
        }
        clearJar()
    }

    function isEmpty() {
        let i = 0
        results.map(res => {
            if (!res?.totalValue) {
                i++
            }
        })
        return i>0
    }

    function addCoin(value) {
        const newState = coins
        const i = newState.findIndex(coin => coin.value == value)
        newState[i].quantity += 1
        setCoins([...newState])
    }

    function clearJar() {
        //console.log("Clearing state")

        setCoins(
            [{ value: 0.20, quantity: 0 },
            { value: 0.10, quantity: 0 },
            { value: 0.05, quantity: 0 },
            { value: 0.01, quantity: 0 }]
        )
    }

    function openModal(index) {
        console.log("Opening modal")
        //setModalOpen({ id: index, type: "check" })
        setOpenModal({ id: index, type: "check" })
    }

    return (
        <div className="w-full h-full relative flex flex-col pt-4 pb-10">
            <Header>Make 3 different combinations to get {answerValue}$</Header>
            <div className="flex flex-row w-full h-full relative px-10 py-8">
                <CoinList coins={coins} addCoin={addCoin} isEmpty={isEmpty}/>

                <div className="flex flex-col items-center">
                    <JarItem addCoin={addCoin} coins={coins} />

                    <div style={{ visibility: totalQuantity > 0 ? "visible" : "hidden" }}>
                        <div className="py-3 mt-3">
                            <Button onClick={clearJar}>Clear</Button>
                        </div>

                        <div className="py-3">
                            <Button onClick={saveAnswer}>Done</Button>
                        </div>
                    </div>


                </div>



                <div className="flex flex-row items-center w-5/12 mx-auto">
                    <JarItem type="sm" id={0} coins={coins} openModal={openModal} />
                    <JarItem type="sm" id={1} coins={coins} openModal={openModal} />
                    <JarItem type="sm" id={2} coins={coins} openModal={openModal} />
                </div>
            </div>

            <ModalWindow open={modalOpen?.type==="check" ? true : false} setOpen={setOpenModal} maxWidth="sm:max-w-lg">
                <JarContent jarId={modalOpen?.id} setCoins={setCoins} setOpen={setOpenModal} />
            </ModalWindow>

            <ModalWindow open={modalOpen?.type==="review" ? true : false} setOpen={setOpenModal} maxWidth="sm:max-w-6xl">
                <ReviewAfterSubmitContent answerValue={answerValue}/>
            </ModalWindow>
            

        </div>

    )
}

const mapStateToProps = state => {
    return {
        results: state.results,
        currentJar: state.currentJar,
        modalOpen: state.modalOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setResults: (val) => dispatch({ type: "SET_RESULTS", payload: val }),
        setCurrentJar: (val) => dispatch({ type: "SET_CURRENT_JAR", payload: val }),
        setOpenModal: (val) => dispatch({ type: "OPEN", payload: val }),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)