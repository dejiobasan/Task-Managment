import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar"
import Home from "../src/components/Home"

function App() {
  return (
    <Router> 
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
