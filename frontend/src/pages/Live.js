import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from '../context/authContext';

export default function Live () {

    const [upcomingFestivals, setUpcomingFestivals] = useState([]);
    const [oldFestivals, setOldFestivals] = useState([]);
    const [error, setError] = useState(null)

    const { currentUser } = useContext(AuthContext);

    const calculateDaysLeft = (targetDate) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const currentDate = new Date();
        const target = new Date(targetDate);
        const difference = Math.round(Math.abs((currentDate - target) / oneDay));
        return difference;
    };

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const previousFestivals = await axios.get("/live/previouslive");
                setOldFestivals(previousFestivals.data)
            } catch (error) { 
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newFestivals = await axios.get("/live/upcominglive");
                setUpcomingFestivals(newFestivals.data)
            } catch (error) { 
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        return new Date(dateTimeString).toLocaleString('es-ES', options);
    };

    const upcomingFestivalsJSX = upcomingFestivals.map((festival, index) => (
        <div className="live-item" key={index}>
            <h2 className="title-live">{festival.festival_name}</h2>
            <h3 className="city-live">Ciudad: {festival.city}</h3>
            <h3 className="date-live">Fecha: {formatDateTime(festival.date)}</h3>
            <h3 className="date-live">Time: {festival.time}</h3>
            <p className="daysuntil-live">Days until: {calculateDaysLeft(festival.date)}</p>
        </div>
    ));

    const oldFestivalsJSX = [];
    for (let i = Math.max(oldFestivals.length - 4, 0); i < oldFestivals.length; i++) {
        const festival = oldFestivals[i];
        oldFestivalsJSX.push(
            <div className="live-item" key={i}>
                <h2 className="title-live">{festival.festival_name}</h2>
                <h3 className="city-live">City: {festival.city}</h3>
                <h3 className="date-live">Date: {formatDateTime(festival.date)}</h3>
                <h3 className="date-live">Time: {festival.time}</h3>
                <h3 className="tickets-live">Attendance: {getRandomNumber(100, 5000)} people </h3>
            </div>
        );
    }
    

return (
    <div className="livemain-container">
        <h1 className="upcoming-live">Upcoming Concerts</h1>
        <div className="live-container">
            {upcomingFestivalsJSX}
        </div>
        <h1 className="past-live">Previous Concerts</h1>
        <div className="past-container">
            {oldFestivalsJSX}
        </div>
        {currentUser && currentUser.id >= 1 && currentUser.id <= 4 && <Link to="/newlive">Add new concert</Link>}
    </div>
);
}