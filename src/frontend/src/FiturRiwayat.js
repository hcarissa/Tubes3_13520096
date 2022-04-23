// import './App.css';
import './FiturRiwayat.css'
import React, { Component } from "react";
import logoDNA from './dna.png';

function FiturTambah() {

  return (
    <div className='App-Fitur-Riwayat'>
      <header data-role="Header-Fitur-Riwayat" className='header'>
        <div className='container1-Fitur-Riwayat'>
          <img src={logoDNA} className='Logo-Fitur-Riwayat' />
          <span className='App-Name-Fitur-Riwayat'> search.dna </span>
        </div>

        <div className='containerFitur-Riwayat'>
            <button className='btn-Fitur-Riwayat'>
                Riwayat Prediksi
            </button>
            <button className='btn-Fitur-Riwayat'>
                Tambah Penyakit
            </button>
            <button className='btn-Fitur-Riwayat'>
                Prediksi Penyakit
            </button>
        </div>
      </header>
      <div data-role="body" className='container-Body-Fitur-Riwayat'>
        <div className='container-box-Fitur-Riwayat'>
          <div className='box-fitur-Riwayat'>
            <div className='box-fitur-header-Riwayat'>
              Riwayat Penyakit
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