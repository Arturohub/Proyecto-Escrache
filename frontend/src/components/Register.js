import pe from "../images/login/pe.jpg"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
        img: null,
    })

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e) => {
        if (e.target.name === 'img') {
            setInputs(prev => ({...prev, profilePic: e.target.files[0]}))
        } else {
            setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
        }
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            const formData = new FormData();
            Object.keys(inputs).forEach(key => formData.append(key, inputs[key]));
            const res = await axios.post("https://proyecto-escrache.onrender.com/api/auth/register", formData)
            navigate("/login")
        }catch(err){
            setError(err.response.data)
        }
    }

    return (
        <div className="signup-container">
            <form className="signupinfo-container" encType="multipart/form-data">
                <img src={pe} alt="log in" />
                <input type="text" placeholder="Enter username" required name="username" onChange={handleChange}/>
                <input type="email" placeholder="Enter email" required name="email" onChange={handleChange}/>
                <input type="password" placeholder="Enter password" required name="password" onChange={handleChange}/>
                <input type="file" required name="img" onChange={handleChange}/>
                <button onClick={handleSubmit} type="submit">Create a new account</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
