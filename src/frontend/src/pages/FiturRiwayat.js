// import './App.css';
import axios from 'axios';
import './FiturRiwayat.css'
import React, { Component, useState } from "react";
import logoDNA from './dna.png';
import { useNavigate, Link } from "react-router-dom";

function FiturTambah() {
  let navigate = useNavigate(); 
  const [val, setVal] = useState();
  var userQuery = '';
  const [data, setData] = useState();
  const [mess, setMess] = useState();
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
    userQuery = event.target.value;
    console.log(userQuery);

  }

  const handleSearch = async (e) =>{
    e.preventDefault();
    await axios.post('http://localhost:8000/queryPenyakit', {
      'input' : userQuery
      }).then(function (response) {
        setData(response.data);
        setMess(response.data.message);
        console.log(response.data);
      });
  };

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
                Test DNA
            </button>
        </div>
      </header>
      <div data-role="body" className='container-Body-Fitur-Riwayat'>
        <div className='container-box-Fitur-Riwayat'>
          <div className='box-fitur-Riwayat'>
            <div className='box-fitur-header-Riwayat'>
              Riwayat Penyakit
            </div>
            <form>
              <div className='container-input-fitur-riwayat'>
                <div className='box-input-fitur-riwayat'>
                  <h3 className='text-Riwayat'>Masukkan Query</h3>
                  <input type="text" onChange = {getInputValue} className="input-file-fitur-testDNA" value={val} />
                </div>
                <button onClick={handleSearch}>Search</button>
                <div className='text-riwayat-result'>
                  {data && data.map((item, index) => {
                    return (
                      <div>{item.tanggalPrediksi} - {item.namaPasien} - {item.penyakitPrediksi} - {item.statusTerprediksi}</div>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FiturTambah;