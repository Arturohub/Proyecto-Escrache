import pe from "../images/login/pe.jpg";
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {

    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
        img: null,
    });
    
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        if (e.target.name === "image") {
            setInputs({ ...inputs, img: e.target.files[0] });
        } else {
            setInputs({ ...inputs, [e.target.name]: e.target.value });
        }
    };

    const uploadImg = async (image) => {
        const formData = new FormData();
        formData.append("image", image);
        
        try {
            const response = await axios.post("https://api.imgur.com/3/image", formData, {
                headers: {
                    Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
                },
            });
            
            return response.data.data.link;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to upload image to Imgur.");
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const imgUrl = await uploadImg(inputs.img);
            
            const formData = new FormData();
            formData.append("username", inputs.username);
            formData.append("email", inputs.email);
            formData.append("password", inputs.password);
            formData.append("image", imgUrl);
            
            const response = await axios.post("https://proyecto-escrache.onrender.com/api/auth/register", formData);
            if (response.data) {
                navigate("/login");
            }
        } catch (error) {
            setError(error.response.data);
        }
    };
    
    return (
        <div className="signup-container">
            <form className="signupinfo-container">
                <img src={pe} alt="log in" />
                <input type="text" placeholder="Enter username" required name="username" onChange={handleChange}/>
                <input type="email" placeholder="Enter email" required name="email" onChange={handleChange}/>
                <input type="password" placeholder="Enter password" required name="password" onChange={handleChange}/>
                <input type="file" required name="image"  onChange={handleChange}/>
                <button onClick={handleSubmit} type="submit">Create a new account</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
    


