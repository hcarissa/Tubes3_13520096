// import './App.css';
import './FiturRiwayat.css'
import React, { Component } from "react";
import logoDNA from './dna.png';
import { useNavigate, Link } from "react-router-dom";

function FiturTambah() {
  let navigate = useNavigate(); 
  const routeChangeTambah = () =>{ 
    let path = `/FiturTambah`; 
    navigate(path);
  }

  const routeChangeRiwayat = () =>{ 
    let path = `/FiturRiwayat`; 
    navigate(path);
  }

  const routeChangePrediksi = () =>{ 
    let path = `/FiturPrediksi`; 
    navigate(path);
  }

  return (
    <div className='App-Fitur-Riwayat'>
      <header data-role="Header-Fitur-Riwayat" className='header'>
        <div className='container1-Fitur-Riwayat'>
          <img src={logoDNA} className='Logo-Fitur-Riwayat' />
          <Link to='/' className='App-Name-Fitur-Riwayat'> search.dna </Link>
        </div>

        <div className='containerFitur-Riwayat'>
            <button className='btn-Fitur-Riwayat' onClick={routeChangeRiwayat}>
                Riwayat Prediksi
            </button>
            <button className='btn-Fitur-Riwayat' onClick={routeChangeTambah}>
                Tambah Penyakit
            </button>
            <button className='btn-Fitur-Riwayat'onClick={routeChangePrediksi}>
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