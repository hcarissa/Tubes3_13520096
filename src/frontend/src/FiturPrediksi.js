// import './App.css';
import './FiturPrediksi.css'
import React, { Component } from "react";
import logoDNA from './dna.png';

function FiturTambah() {
  return (
    <div className='App-Fitur-Prediksi'>
      <header data-role="Header-Fitur-Prediksi" className='header'>
        <div className='container1-Fitur-Prediksi'>
          <img src={logoDNA} className='Logo-Fitur-Prediksi' />
          <span className='App-Name-Fitur-Prediksi'> search.dna </span>
        </div>

        <div className='containerFitur-Prediksi'>
            <button className='btn-Fitur-Prediksi'>
                Riwayat Prediksi
            </button>
            <button className='btn-Fitur-Prediksi'>
                Tambah Penyakit
            </button>
            <button className='btn-Fitur-Prediksi'>
                Prediksi Penyakit
            </button>
        </div>
      </header>
      <div data-role="body" className='container-Body-Fitur-Prediksi'>
        <div className='container-box-Fitur-Prediksi'>
          <div className='box-fitur-Prediksi'>
            <div className='box-fitur-header-Prediksi'>
              Prediksi Penyakit
            </div>
            <div>
              body
            </div>
            <span>aa</span>
          </div>
        </div>
      </div>

    </div>
  );
}
export default FiturTambah;