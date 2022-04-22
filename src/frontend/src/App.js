import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./Home"
import Fitur from "./Fitur"

function App() {
  return (
    <div className="AppApp">
      <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="Fitur" element={ <Fitur/> } />
      </Routes>
    </div>
  )
}

export default App