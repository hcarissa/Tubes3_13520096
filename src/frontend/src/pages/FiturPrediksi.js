// import './App.css';
import './FiturPrediksi.css'
import React, { Component, useState, useRef } from "react";
import logoDNA from './dna.png';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

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

  const [hasil, setHasil] = useState();
  const [val, setVal] = useState();
  const [pred, setPred] = useState();
  var inputNamaPengguna = "";
  var prediksi = "";
  var algoritmaPencarian = "";
  var text = "";

  const ref = useRef();

  const getInputValueNamaPengguna = (event) => {
    inputNamaPengguna = event.target.value;
    console.log(inputNamaPengguna);
  };

  const getInputValuePrediksiPenyakit = (event) => {
    prediksi = event.target.value;
    console.log(prediksi);
  };

  const getInputValueAlgoritmaPencarian = (event) => {
    algoritmaPencarian = event.target.value;
    console.log(algoritmaPencarian);
  };

  function setFileSequenceDNA(event) {
    const reader = new FileReader()
    reader.onload = async (event) => { 
      text = (event.target.result)
      console.log(text)
      // alert(text)
    };
    reader.readAsText(event.target.files[0])
  }

  
  const reset = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/tesDNA', {
      'namaPengguna' : inputNamaPengguna,
      'DNA' : text,
      'prediksiPenyakit' : prediksi,
      'algoritmaPencarian' : algoritmaPencarian
    }).then(response => {
      console.log(response.data.message);
      setHasil(response.data.message);
      // await sleep(5000);
    });
    setVal("");
    ref.current.value = "";
    setPred("");
  };

  return (
    <div className='App-Fitur-Prediksi'>
      <header data-role="Header-Fitur-Prediksi" className='header'>
        <div className='container1-Fitur-Prediksi'>
          <img src={logoDNA} className='Logo-Fitur-Prediksi' />
          <Link to='/' className='App-Name-Fitur-Prediksi'> search.dna </Link>
        </div>

        <div className='containerFitur-Prediksi'>
            <button className='btn-Fitur-Prediksi' onClick={routeChangeRiwayat}>
                Riwayat Prediksi
            </button>
            <button className='btn-Fitur-Prediksi' onClick={routeChangeTambah}>
                Tambah Penyakit
            </button>
            <button className='btn-Fitur-Prediksi'onClick={routeChangePrediksi}>
                Test DNA
            </button>
        </div>
      </header>
      <div data-role="body" className='container-Body-Fitur-Prediksi'>
        <div className='container-box-Fitur-Prediksi'>
          <div className='box-fitur-Prediksi'>
            <div className='box-fitur-header-Prediksi'>
              Test DNA
            </div>
            <div>
            <form>
              <div className='container-input-fitur-testDNA'>
                <div className='box-input-fitur-testDNA'>
                  <h3 className='text-testDNA'>Nama Pengguna</h3>
                  <input type="text" className="input-file-fitur-testDNA" onChange={getInputValueNamaPengguna} value={val}/>
                </div>
                <div className='box-input-fitur-testDNA'>
                  <h3 className='text-testDNA'>Sequence DNA</h3>
                  <input className="input-file-Choosen-fitur-testDNA" type="file" ref={ref} name="file" onChange={setFileSequenceDNA.bind(this)}/>
                </div>
                <div className='box-input-fitur-testDNA'>
                  <h3 className='text-testDNA'>Prediksi Penyakit</h3>
                  <input type="text" className="input-file-fitur-testDNA" onChange={getInputValuePrediksiPenyakit} value={pred}/>
                </div>
                <div className='box-input-fitur-testDNA' min-height="100px">
                  <h3 className='text-testDNA'>Algoritma Pencocokan String</h3>
                  <select className="input-file-fitur-testDNA" onChange={getInputValueAlgoritmaPencarian}>
                    <option value="KMP">Knuth-Morris-Pratt</option>
                    <option value="BM">Boyer–Moore</option>
                  </select>
                </div>
                <button onClick={reset} >Submit</button>
                <div className='text-tesDNA-result'>
                {hasil && <p>{hasil}  </p>}
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default FiturTambah;