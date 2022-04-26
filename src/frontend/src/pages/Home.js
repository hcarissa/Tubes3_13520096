import './Home.css';
import React, { Component } from "react";
// import {Link } from "react-router-dom";
import logoDNA from './dna.png';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate(); 
  const routeChangeTambah = () =>{ 
    let path = `FiturTambah`; 
    navigate(path);
  }

  const routeChangeRiwayat = () =>{ 
    let path = `FiturRiwayat`; 
    navigate(path);
  }

  const routeChangePrediksi = () =>{ 
    let path = `FiturPrediksi`; 
    navigate(path);
  }

  return (
    <div className='App'>
      <header data-role="Header" className='header'>
        <div className='container1'>
          <img src={logoDNA} className='Logo' />
          <span className='App-Name'> search.dna </span>
        </div>
      </header>

      <div data-role="body" className='container'>
        <div className='container2'>
          <div className='App-Description'>
            <h1 >search.dna</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices sapien nec ultricies posuere. Nulla facilisi. Vivamus luctus, leo vel consequat ullamcorper, justo ex sodales urna, vel porttitor sem nulla quis ex. Proin vestibulum lectus eu lorem congue consequat. Proin feugiat dui orci, eget varius ligula viverra vitae. Proin ac nulla pulvinar, facilisis ante sed, scelerisque mi.</p>
          </div>
          <div className='container3'>
            <h1 className='text-FiturKami'>FITUR KAMI</h1>
            <button className='box1' onClick={routeChangeRiwayat}>
              <h1 className='text-FiturFitur' >Riwayat Prediksi</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices sapien nec ultricies posuere.</p>
            </button>
            <button className='box1' onClick={routeChangeTambah}>
              <h1 className='text-FiturFitur'>Tambah Penyakit</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices sapien nec ultricies posuere.</p>
            </button>
            <button className='box1' onClick={routeChangePrediksi}>
              <h1 className='text-FiturFitur'>Prediksi Penyakit</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices sapien nec ultricies posuere.</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
