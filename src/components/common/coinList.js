import CoinItem from "./coinItem"

function CoinList({ coins, setCoins, addCoin, isEmpty, pushCoinPosition, style }) {
    return (
        <div className={style}>
            {
                coins?.map((coin, index) => {
                    return (
                        <CoinItem key={index} value={coin.value} quantity={coin.quantity} addCoin={addCoin} isEmpty={isEmpty} coins={coins} setCoins={setCoins} pushCoinPosition={pushCoinPosition}/>
                    )
                })
            }
        </div>

    )
}

export default CoinList
