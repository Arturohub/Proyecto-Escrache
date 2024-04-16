import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

export default function Contact() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const axiosPostData = async () => {
        const postData = {
            name: name,
            email: email,
            message: message
        };

        try {
            await axios.post("http://localhost:4000/api/contact/send", postData, { withCredentials: true });
            setError(<p className="success">Message sent. Thanks for contacting us!!</p>);
            setSubmitted(true);
        } catch (error) {
            setError(<p className="error">Failed to send message! Please, try again :D</p>);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!message || !name || !email) {
            setError(<p className="required">Name, Email, or Message are still empty. Please, fill them all and click Submit again.</p>);
        } else {
            setError("");
            setButtonDisabled(true);
            await axiosPostData();
        }
    };

    return (
        <div className="contact-container">
            {submitted ? (
                <div className="success-container">
                    <p className="success-message">Thanks for your message! We will reply to you as soon as possible!</p>
                    <Link to="/" title="Go back to main page!" className="play-button"><FaPlay className="play-icon" /></Link>
                </div>
            ) : (
                <div className="formulario-container">
                    <p className="contact-text"><span>C</span><span>O</span><span>N</span><span>T</span><span>A</span><span>C</span><span>T</span><span>&nbsp;</span><span>&nbsp;</span><span>U</span><span>S</span></p>
                    <form>
                        <div className="input-container">
                            <label className="name-label" htmlFor="name">Name:</label>
                            <input type="text" className="name-input" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className="input-container">
                            <label className="email-label" htmlFor="email">Email:</label>
                            <input type="email" className="email-input" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="input-container">
                            <label className="message-label" htmlFor="message">Message:</label>
                            <textarea className="message-input" value={message} onChange={(e) => setMessage(e.target.value)} rows="8" required />
                        </div>
                        <button onClick={handleSubmit} className="submit-button" type="submit" disabled={buttonDisabled}>Submit</button>
                        <p className="error-message">{error}</p>
                    </form>
                </div>
            )}
        </div>
    );
}
