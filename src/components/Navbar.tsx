import { Logo} from "./Icons";
import './Navbar.css'
const Navbar: React.FC = () => {
    return (
        <nav>
            <Logo />
            <div>
                <img src="/Pokebola-pokeball-png-0.png" alt="Pokebola" className="logo" />
            </div>
        </nav>
    );
  };
  
  export default Navbar;
 