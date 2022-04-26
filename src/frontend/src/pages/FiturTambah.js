// import './App.css';
import './FiturTambah.css'
import React, { Component } from "react";
import logoDNA from './dna.png';
import { useNavigate, Link } from "react-router-dom";
import { render } from 'react-dom';
import ReactFileReader from 'react-file-reader';

function FiturTambah() {

    const getInputValue = (event) => {
      const userValue = event.target.value;
      console.log(userValue);
    };

    function setFileeee(event) {

      const reader = new FileReader()
      reader.onload = async (event) => { 
        const text = (event.target.result)
        console.log(text)
        // alert(text)
      };
      reader.readAsText(event.target.files[0])
    }

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
            <form>
              <div>
                <label>
                    Nama Penyakit 
                </label>
                <input type="text" onChange={getInputValue}/>
                <label>Sequence DNA</label>
                <input type="file" name="file" onChange={setFileeee.bind(this)}/>
                <button>upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}




export default FiturTambah;