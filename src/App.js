import logo from './logo.svg';
import './App.css';
import MainContainer from './components/mainContainer';
import Header from './components/header';
import { useState, useEffect } from "react"
import { connect } from 'react-redux'

function App({setOpenModal}) {
  


  return (
    <div className="flex flex-col items-center justify-center w-full absolute">
      <div className="bg-white rounded-xl border-blue-300 border-2 shadow-xl md:max-w-7xl h-auto w-full">
        <MainContainer/>
      </div>
      <div className="pt-8">
        <button className="bg-blue-300 py-2 px-10 rounded-lg text-white font-bold" onClick={()=>setOpenModal({type: "review"})}>Submit</button>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    incrementCoinQuantity: (val) => dispatch({ type: "INCREMENT_QUANTITY", payload: val }),
    clearCoinState: (val) => dispatch({ type: "CLEAR", payload: val}),
    setOpenModal: (val) => dispatch({ type: "OPEN", payload: val }),
  }
}

export default connect(null, mapDispatchToProps)(App);
