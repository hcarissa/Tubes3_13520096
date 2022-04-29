// import './App.css';
import './FiturTambah.css'
import React, { Component, useState, useRef } from "react";
import logoDNA from './dna.png';
import { useNavigate, Link } from "react-router-dom";
import { render } from 'react-dom';
// import ReactFileReader from 'react-file-reader';
import axios from 'axios';

function FiturTambah() {
  const [val, setVal] = useState();
  const ref = useRef();
  var userValue = '';
  var text = "";
  const [hasil, setHasil] = useState();

  const reset = () => {
    axios.post('http://localhost:8000/tambahPenyakit', {
      'namaPenyakit' : userValue,
      'rantaiDNA' : text
    }).then(function (response) {
      console.log(response.data.message);
      setHasil(response.data.message);
    });
    ref.current.value = "";
    setVal = "";
  };

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
    userValue = event.target.value;
    console.log(userValue);
  };

    function setFileeee(event) {
      const reader = new FileReader()
      reader.onload = async (event) => { 
        text = (event.target.result)
        // console.log(text)
        // alert(text)
      };
      reader.readAsText(event.target.files[0])
    }

    // const hasil = 'Berhasil ditambahkan!';

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
                  <input type="text" onChange={getInputValue} className="input-text-fitur-tambah" value={val}/>
                </div>
                
                <div className='box-input-fitur-tambah'>
                  <h3 className='text-tambah'>Sequence DNA</h3>
                  <input className="input-file-fitur-tambah" type="file"  ref={ref} name="file" onChange={setFileeee.bind(this)}/>
                </div>
                <button onClick={reset}>upload</button>
                <div className='text-tambah-result'>
                  {hasil}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}



export default FiturTambah;