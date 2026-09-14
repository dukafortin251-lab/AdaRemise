import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import DataDashboard from '../components/DataDashboard.jsx'

const TableauDeBord = () => {
  const { prenom, nom } = useParams();

  return (
    <div>
      <Navbar prenom={prenom} nom={nom} />
      <h1>Tableau de bord</h1>
      <DataDashboard />
    </div>
  )
}

export default TableauDeBord;