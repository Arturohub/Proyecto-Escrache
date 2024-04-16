import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function NewLive () {

    const [festival, setFestival] = useState("")
    const [city, setCity] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    
    
    const navigate = useNavigate()

    const axiosPostData = async () => {
        const postData = {
            festival_name: festival,
            city: city,
            date: date,
            time: time
        };

        try {
            const response = await axios.post("/live/newlive", postData, { withCredentials: true });
            setError(<p className="success">New upcoming concert sent!</p>);
            setSubmitted(true);
        } catch (error) {
            if(error.response && error.response.data === "Not authenticated!") {
                setError(<p className="error">You must log in if you want to publish new concerts</p>);
            } else{
                setError(<p className="error">Failed to send new upcoming concert! Please, try again :D</p>);
            }
            
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!festival || !city || !date) {
            setError(<p className="required">Festival Name, City and Date are still empty. Please, fill them all and click Submit again.</p>);
        } else {
            setError("");
            setButtonDisabled(true);
            await axiosPostData();
            navigate("/live")
        }
    };

        return (
            <div className="newlive-container">
                <h1>Add Upcoming Concert</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Festival Name" value={festival} onChange={(e) => setFestival(e.target.value)} required />
                    <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                    <input type="text" placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} required />
                    <input type="text" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    <button type="submit" disabled={buttonDisabled}>Submit</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        );
    }