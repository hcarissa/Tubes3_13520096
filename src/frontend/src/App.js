import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import FiturTambah from "./pages/FiturTambah"
import FiturRiwayat from "./pages/FiturRiwayat"
import FiturPrediksi from './pages/FiturPrediksi';

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