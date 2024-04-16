import { useContext, useState } from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import pe from "../images/login/pe.jpg"
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const [menu, setMenu] = useState(false)
  const navigate = useNavigate();

  const appearMenu = () => {
    setMenu(!menu)
  }

  const { currentUser, logout } = useContext(AuthContext)

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/"><img src={pe} alt="PE logo"/></Link> 
      <ul className="links">
        <li className="navbar-item"><a href="/">Home</a></li>
        <li className="navbar-item"><a href="/about">About</a></li>
        <li className="navbar-item"><a href="/blog">Blog</a></li>
        <li className="navbar-item"><a href="/live">Live</a></li>
        <li className="navbar-item"><a href="/merchandise">Merchandise</a></li>
        <li className="navbar-item"><a href="/contact">Contact</a></li>
        {currentUser ? <li className="navbar-item"><a onClick={handleLogout}>Logout</a></li>  : <li className="navbar-item"><a href="/login">Login</a></li>}
        {currentUser && <li className="navbar-item"><a href="/write">New Post</a></li>}
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
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
          <a href="/live">Live</a>
          <a href="/merchandise">Merchandise</a>
          <a href="/contact">Contact</a>
          {currentUser ? <a onClick={handleLogout}>Logout</a> : <a href="/login">Login</a>}
          {currentUser && <a href="/write">New Post</a>}
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
