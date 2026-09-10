import { Routes, Route } from 'react-router-dom'
import Inventaire from './pages/Inventaire.jsx'
import Benevoles from './pages/Benevoles.jsx'
import TableauDeBord from './pages/TableauDeBord.jsx'
import Depots from './pages/Depots.jsx'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Benevoles />} />
        <Route path="/inventaire" element={<Inventaire />} />
        <Route path="/depots" element={<Depots />} />
        <Route path="/tableau-de-bord" element={<TableauDeBord />} />
      </Routes>
    </div>
  )
}

export default App