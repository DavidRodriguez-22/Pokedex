import { Logo} from "./Icons";
import { useNavigate } from "react-router-dom";
import './Navbar.css'
const Navbar: React.FC = () => {
    const navigate = useNavigate(); 
    return (
        <nav>
            <Logo />
            <div>
                <img 
                src="/Pokebola-pokeball-png-0.png" 
                alt="Pokebola" 
                className="logo"
                onClick={() => navigate(-1)}
                style={{ cursor: "pointer" }}
            />
            <span className="back-text">Atrás</span>
            </div>
        </nav>
    );
  };
  
  export default Navbar;

  
 