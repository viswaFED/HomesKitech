import "./MBottombar.css";
import { NavLink } from "react-router-dom";
import { FiHome, FiHeart } from "react-icons/fi"; // Assuming you are using react-icons for icons

const MobileBottomBar = () => {
  return (
    <div className="mobile-bottom-bar">
      <NavLink to="/home" className="bottom-bar-item" activeClassName="active">
        <FiHome className="bottom-bar-icon" />
        <span className="bottom-bar-text">Home</span>
      </NavLink>
      <NavLink
        to="/recipe/favorites"
        className="bottom-bar-item"
        activeClassName="active"
      >
        <FiHeart className="bottom-bar-icon" />
        <span className="bottom-bar-text">Favorites</span>
      </NavLink>
    </div>
  );
};

export default MobileBottomBar;
