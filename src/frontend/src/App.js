import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./Home"
import FiturTambah from "./FiturTambah"
import FiturRiwayat from "./FiturRiwayat"
import FiturPrediksi from './FiturPrediksi';

function App() {
  return (
    <div className="AppApp">
      <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="FiturTambah" element={ <FiturTambah/> } />
            <Route path="FiturRiwayat" element={ <FiturRiwayat/> } />
            <Route path="FiturPrediksi" element={ <FiturPrediksi/> } />
      </Routes>
    </div>
  )
}
export default App