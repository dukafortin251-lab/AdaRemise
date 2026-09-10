import BenevolesListe from "../components/ListeBenevoles";
import logo from '../assets/logo2.png';
const Benevoles = () => {
  return (
    <div>
      <img className="logoacceuil" src={logo} alt="Ada Remise" />
      <h1>Bienvenue à La Remise !</h1>
      <h2>Qui es-tu ? </h2>
      <BenevolesListe />
    </div>
  )
}

export default Benevoles;