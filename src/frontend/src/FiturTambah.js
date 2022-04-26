// import './App.css';
import './FiturTambah.css'
import React, { Component } from "react";
import logoDNA from './dna.png';
import { useNavigate, Link } from "react-router-dom";

function FiturTambah() {

  return (
    <div className='App-Fitur-Tambah'>
      <header data-role="Header-Fitur-Tambah" className='header'>
        <div className='container1-Fitur-Tambah'>
          <img src={logoDNA} className='Logo-Fitur-Tambah' />
          <Link to='/' className='App-Name-Fitur-Tambah'> search.dna </Link>
        </div>

        <div className='containerFitur-Tambah'>
            <button className='btn-Fitur-Tambah'>
                Riwayat Prediksi
            </button>
            <button className='btn-Fitur-Tambah'>
                Tambah Penyakit
            </button>
            <button className='btn-Fitur-Tambah'>
                Prediksi Penyakit
            </button>
        </div>
      </header>
      <div data-role="body" className='container-Body-Fitur-Tambah'>
        <div className='container-box-Fitur-Tambah'>
          <div className='box-fitur-Tambah'>
            <div className='box-fitur-header-Tambah'>
              Tambah Penyakit
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