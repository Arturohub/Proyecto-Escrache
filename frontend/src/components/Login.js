import pe from "../images/login/pe.jpg";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios"; 

axios.defaults.withCredentials = true; 

export default function Login() {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/blog");
        } catch (err) {
            if (err.response) {
                setError(err.response.data);
            } 
        }
    };
    

    const goToCreateAccount = () => {
        navigate("/register")
    };

    return (
        <div className="login-container">
            <div className="logininfo-container">
                <img src={pe} alt="log in" />
                <input type="text" placeholder="Enter username" required name="username" onChange={handleChange} />
                <input type="password" placeholder="Enter password" required name="password" onChange={handleChange}/>
                <button type="submit" onClick={handleSubmit}>Log In</button>
                {error && <p>{error}</p>}
                <button onClick={goToCreateAccount} type="button" className="create-account-btn">Create an account</button>
                <div className="forgot-password">
                    <a href="/forgot-password">Forgotten password? Click here!</a>
                </div>
            </div>
        </div>
    );
}
