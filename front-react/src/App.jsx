import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Inventaire from './pages/Inventaire.jsx'
import Benevoles from './pages/Benevoles.jsx'
import TableauDeBord from './pages/TableauDeBord.jsx'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
    <Routes>
      <Route path="/" element={<Benevoles />} />
      <Route path="/inventaire" element={<Inventaire />} />
      <Route path="/tableau-de-bord" element={<TableauDeBord />} />
    </Routes>
    </div>
  )
}

export default App