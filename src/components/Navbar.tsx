import { Logo, Sol, Luna } from "./Icons";
import './Navbar.css'
const Navbar: React.FC = () => {
    return (
        <nav>
            <Logo />
            <div className="switch">
                <Sol />
                
                <label>
                    <input type="checkbox" className="check-switch" hidden/>
                    <span className="slider" ></span>
                </label>
                <Luna />
            </div>
        </nav>
    );
  };
  
  export default Navbar;
  