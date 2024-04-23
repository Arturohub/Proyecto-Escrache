import pe from "../images/login/pe.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Register() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        image: null, 
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        axios.defaults.withCredentials = false;
        return () => {
            axios.defaults.withCredentials = true;
        };
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setInputs({ ...inputs, image: e.target.files[0] });
        } else {
            setInputs({ ...inputs, [e.target.name]: e.target.value });
        }
    };

    const uploadImg = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    
            const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL;
   
            console.log("Uploading image to Cloudinary...");
            const response = await axios.post(cloudinaryUrl, formData);
            setSuccess("Image uploaded successfully!");
            return response.data.secure_url;
        } catch (error) {
            console.error("Failed to upload image to Cloudinary:", error);
            setError("Failed to upload image to Cloudinary. Please, try again later")
        }
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    
        try {
            const imgUrl = await uploadImg(inputs.image);
            
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

            if (error.response) {
                setError(error.response.data);
            } else {
                setError("An error occurred while registering. Please, reload the page and try again");
            }
        }
    };
    
    
    return (
        <div className="signup-container">
            <form className="signupinfo-container">
                <img src={pe} alt="log in" />
                <input type="text" placeholder="Enter username" required name="username" onChange={handleChange}/>
                <input type="email" placeholder="Enter email" required name="email" onChange={handleChange}/>
                <input type="password" placeholder="Enter password" required name="password" onChange={handleChange}/>
                <input type="file" required name="image" onChange={handleChange}/>
                <button onClick={handleSubmit} type="submit">Create a new account</button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    );
}
