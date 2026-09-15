import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import DataDashboard from "../components/DataDashboard.jsx";

const TableauDeBord = () => {
  const { prenom, nom } = useParams();

  return (
    <div>
      <Navbar prenom={prenom} nom={nom} />
      <div className="depot-container">
        <div className="depot-header">
          <h2>Tableau de bord</h2>
        </div>
        <DataDashboard />
      </div>
    </div>
  );
};

export default TableauDeBord;
