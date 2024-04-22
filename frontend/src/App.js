import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import About from './pages/About';
import Blog from './pages/Blog';
import Single from './pages/Single';
import Write from './pages/Write';
import Live from './pages/Live';
import Merchandise from './pages/Merchandise';
import Contact from './pages/Contact';
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import NewLive from "./components/NewLive"


function App() {
  return (
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/reset-password" element={<ResetPassword />} /> 
          <Route path="/live" element={<Live />} />
          <Route path="/newlive" element={<NewLive />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>

      </BrowserRouter>
  );
}

export default App;
