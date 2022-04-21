import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import getWindowDimensions from "./components/getWindowDimensions";
import logoDNA from './dna.png';


function App() {
  return (
    <div className='App'>
      <header data-role="Header" className='header'>
        <div className='container1'>
          <img src={logoDNA} className='Logo' />
          <span className='App-Name'> search.dna </span>
        </div>
      </header>

      <div data-role="body" className='container'>
      </div>
    </div>
  );
}

export default App;
