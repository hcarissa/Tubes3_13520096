// import './App.css';
import './Fitur.css'
import React, { Component } from "react";
import logoDNA from './dna.png';

function Fitur() {
  return (
    <div className='App-Fitur'>
      <header data-role="Header-Fitur" className='header'>
        <div className='container1-Fitur'>
          <img src={logoDNA} className='Logo-Fitur' />
          <span className='App-Name-Fitur'> search.dna </span>
        </div>

        <div className='containerFitur'>
            <button className='btn-Fitur'>
                Riwayat Prediksi
            </button>
            <button className='btn-Fitur'>
                Tambah Penyakit
            </button>
            <button className='btn-Fitur'>
                Prediksi Penyakit
            </button>
        </div>
      </header>

    </div>
  );
}

export default Fitur;