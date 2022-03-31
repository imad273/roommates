import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./Components/Home"
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Search from './Components/Search'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;