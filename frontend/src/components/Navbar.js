import { useContext, useState } from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import pe from "../images/login/pe.jpg"
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const appearMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/"><img src={pe} alt="PE logo"/></Link> 
      <ul className="links">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/about">About</Link></li>
        <li className="navbar-item"><Link to="/blog">Blog</Link></li>
        <li className="navbar-item"><Link to="/live">Live</Link></li>
        <li className="navbar-item"><Link to="/merchandise">Merchandise</Link></li>
        <li className="navbar-item"><Link to="/contact">Contact</Link></li>
        {currentUser ? <li className="navbar-item"><a onClick={handleLogout}>Logout</a></li>  : <li className="navbar-item"><Link to="/login">Login</Link></li>}
        {currentUser && <li className="navbar-item"><Link to="/write">New Post</Link></li>}
        <li className="navbar-item"><span>{currentUser?.username}</span></li>
      </ul>
      <ul className="socials">
        <a href="#" className="social-icon"><FaFacebook className="fb"/></a>
        <a href="#" className="social-icon"><FaYoutube className="yt"/></a>
        <a href="#" className="social-icon"><FaInstagram className="ig"/></a>
      </ul>
      <div className="dropdown-menu">
        <button className="button-menu" onClick={appearMenu}>𝄚 Menu</button>
        <div className={`dropdown-content ${menu ? 'show-menu' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/live">Live</Link>
          <Link to="/merchandise">Merchandise</Link>
          <Link to="/contact">Contact</Link>
          {currentUser ? <a onClick={handleLogout}>Logout</a> : <Link to="/login">Login</Link>}
          {currentUser && <Link to="/write">New Post</Link>}
          {currentUser ? <span>{currentUser?.username}</span> : ""}
          <div className="social-menu">
            <a href="#" className="social-icon"><FaFacebook className="fb"/></a>
            <a href="#" className="social-icon"><FaYoutube className="yt"/></a>
            <a href="#" className="social-icon"><FaInstagram className="ig"/></a>
          </div>
        </div>
      </div>
    </nav>
  );
};
