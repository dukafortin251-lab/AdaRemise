import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import DataDashboard from '../components/DataDashboard.jsx'

const TableauDeBord = () => {
  const { prenom, nom } = useParams();

  return (
    <div>
      <Navbar prenom={prenom} nom={nom} />
      <h2>Tableau de bord</h2>
      <DataDashboard />
    </div>
  )
}

export default TableauDeBord;