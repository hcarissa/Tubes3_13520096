// import './App.css';
import './FiturTambah.css'
import React, { Component } from "react";
import logoDNA from './dna.png';
import { useNavigate, Link } from "react-router-dom";
import { render } from 'react-dom';
import ReactFileReader from 'react-file-reader';

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
            <button className='btn-Fitur-Tambah' onClick={routeChangeRiwayat}>
                Riwayat Prediksi
            </button>
            <button className='btn-Fitur-Tambah' onClick={routeChangeTambah}>
                Tambah Penyakit
            </button>
            <button className='btn-Fitur-Tambah' onClick={routeChangePrediksi}>
                Test DNA
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
              <div className='container-input-fitur-tambah'>
                <div className='box-input-fitur-tambah'>
                  <h3 className='text-tambah'>Nama Penyakit</h3>
                  <input type="text" onChange={getInputValue} className="input-file-fitur-tambah"/>
                </div>
                
                <div className='box-input-fitur-tambah'>
                  <h3 className='text-tambah'>Sequence DNA</h3>
                  <input className="input-file-fitur-tambah" type="file" name="file" onChange={setFileeee.bind(this)}/>
                </div>
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