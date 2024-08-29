import { Link } from "react-router-dom";
import '../stylesheets/menu-lg.css'

const MdScreenMenu = () => {
  return ( 
    <nav>
       <ul className="links antialiased hover:cursor-pointer hidden md:flex font-medium gap-2 md:gap-4 lg:gap-6 xl:gap-8 text-sm lg:text-base">
          <li className="md-link"> <Link to='/hospitals'>Hospitals</Link></li>
          <li className="md-link"> <Link to='/doctors'>Doctors</Link></li>
          <li className="md-link"> <Link to='/services'>Services</Link></li>
          <li className="md-link"> <Link to='/sign_in'>Login</Link></li>
        </ul>
    </nav>
   );
}
 
export default MdScreenMenu;