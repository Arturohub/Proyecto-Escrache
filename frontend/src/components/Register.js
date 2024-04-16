import pe from "../images/login/pe.jpg"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    })

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
        const res = await axios.post("/auth/register", inputs)
            navigate("/login")
        }catch(err){
            setError(err.response.data)
        }
    }

    return (
<       div className="signup-container">
            <form className="signupinfo-container">
                <img src={pe} alt="log in" />
                <input type="text" placeholder="Enter username" required name="username" onChange={handleChange}/>
                <input type="email" placeholder="Enter email" required name="email" onChange={handleChange}/>
                <input type="password" placeholder="Enter password" required name="password" onChange={handleChange}/>
                <button onClick={handleSubmit} type="submit">Create a new account</button>
                {error && <p>{error}</p>}

            </form>
        </div>
    );
}
