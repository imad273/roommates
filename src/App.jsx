import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./Components/Home"
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Signup from './Components/Account/Singup'
import Login from './Components/Account/Login'
import Search from './Components/Search'

function App() {
  let userSession = sessionStorage.getItem('user');

  return (
    <div className="App">
      <Navbar session={userSession} />
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>
        <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;