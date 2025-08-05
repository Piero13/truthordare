import { Link } from "react-router-dom";
import Logo from '../assets/evil_heart.png';
import { RiSettings4Fill } from "react-icons/ri";
import { FaHouse } from "react-icons/fa6";

export default function CustomNavbar() {
    return (
        <nav className="bg-gradient-quaternary p-2 d-flex justify-content-between align-items-center">
            <Link to={"/"} title="Home" className="w-content ms-4"><FaHouse size={30} style={{fill : "#531f5e"}}/></Link>
            <div className="d-flex align-items-center w-content">
                    <img src={ Logo } alt="" className="w-5 me-2"/>
                    <h1 className='font-title text-secondary fw-bold fs-4 fs-md-2 m-0 text-start'>Truth or Dare</h1>
            </div>
            <Link to={"/settings"} title="Settings" className="w-content me-4"><RiSettings4Fill size={30} style={{fill : "#531f5e"}}/></Link>
        </nav>
    );
}