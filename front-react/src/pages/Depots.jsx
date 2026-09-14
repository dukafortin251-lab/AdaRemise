import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import ListeDepots from '../components/ListeDepots.jsx'

const Depots = () => {
  const { prenom, nom } = useParams();

  return (
    <div>
      <Navbar prenom={prenom} nom={nom} />
      <ListeDepots />
    </div>
  )
}

export default Depots;