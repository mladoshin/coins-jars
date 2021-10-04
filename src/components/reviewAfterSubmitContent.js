import JarItem from "./common/jarItem"
import { connect } from "react-redux"
import Button from "./common/button"

function ReviewAfterSubmitContent({ results, answerValue, setResults, setCurrentJar, setOpenModal }) {

    function handleRedo() {
        setResults([{}, {}, {}])
        setCurrentJar({index: 2})
        setOpenModal({})
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-between w-full mb-5">
                {results?.map(res => {
                    const correct = res?.totalValue == answerValue ? true : false

                    const style = correct ? "bg-green-300 bg-opacity-75" : "bg-red-300 bg-opacity-75"

                    return (
                        <div className={"border-2 border-gray-300 rounded-lg shadow-lg p-10 " + style}>
                            <JarItem />
                        </div>
                    )
                })}
            </div>
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
        setCurrentJar: (val) => dispatch({ type: "SET_CURRENT_JAR", payload: val }),
        setOpenModal: (val) => dispatch({ type: "OPEN", payload: val }),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAfterSubmitContent)
