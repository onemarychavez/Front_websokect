
import './App.css'
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom'
import Home from './Componentes/Home'
import Login from './Componentes/Loguin'
function App() {

  return (
    
      <Router>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </Router>
     
    
  )
}

export default App
