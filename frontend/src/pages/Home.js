import profile from "../images/background/profile.jpg";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStepForward, FaVolumeOff, FaStepBackward, FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';



export default function Home() {
    const songs = [
        {
            title: "Mucho Macho",
            file: "/songs/MuchoMacho.mp3"
        },
        {
            title: "El Dinero No Se Come",
            file: "/songs/Dinero.mp3"
        }
    ];

    const audioRef = useRef(null);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [play, setPlay] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [muted, setMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const [time, setTime] = useState(0);
    const [songName, setSongName] = useState("");


    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * songs.length)
        setCurrentSongIndex(randomIndex);
        setSongName(songs[randomIndex].title);
    }, []);

    useEffect(() => {
        if (play) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [play]);

    useEffect(() => {
        const audio = audioRef.current;

        
        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        
        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
        };
    }, []);

    const updateTime = () => {
        setTime(audioRef.current.currentTime);
    };

    const updateDuration = () => {
        setDuration(audioRef.current.duration);
    };

    const handleVolume = (value) => {
        setVolume(value);
        setMuted(value === 0);
        audioRef.current.volume = value;
    };

    const handleVolumeDown = () => {
        const newVolume = Math.max(volume - 0.1, 0);
        setVolume(newVolume);
        setMuted(newVolume <= 0.1);
        audioRef.current.volume = newVolume;
    };

    const handleVolumeUp = () => {
        const newVolume = Math.min(volume + 0.1, 1);
        setVolume(newVolume);
        setMuted(false);
        audioRef.current.volume = newVolume;
    };

    const handleNext = () => {
        const newIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(newIndex);
        setSongName(songs[newIndex].title);
        audioRef.current.src = songs[newIndex].file;
        audioRef.current.addEventListener('loadedmetadata', () => {
            setPlay(true);
            audioRef.current.play();
        });
    };

    const handlePrevious = () => {
        const newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setCurrentSongIndex(newIndex);
        setSongName(songs[newIndex].title);
        audioRef.current.src = songs[newIndex].file;
        audioRef.current.addEventListener('loadedmetadata', () => {
            setPlay(true);
            audioRef.current.play();
        });
    };

    const handleMute = () => {
        const Mute = !muted;
        setMuted(Mute)
        if (Mute) {
            audioRef.current.volume = 0;
        } else {
        audioRef.current.volume = 0.5;
        }
        setVolume (Mute ? 0 : 0.5)
    }

    function formatTime(seconds) {
        let date = new Date(0);
        date.setSeconds(seconds);
        return date.toISOString().substr(11, 8);
    }

    return (
        <>
            <div className="home-container">
                <img className="pic-home" alt="profile pic" src={profile} />
                <h1 className={`title-home ${play ? 'shaking' : ''}`}>Proyecto Escrache</h1>
            </div>
            <div className="musicplayer">
                <div className="controls-container">
                    <button className="button-music" onClick={() => setPlay(!play)}>{play ? <FaPause /> : <FaPlay />}</button>
                    <input type="range" id="duration" name="duration" min="0" max={duration} step="1" value={time} onChange={(e) => audioRef.current.currentTime = parseFloat(e.target.value)} />
                    <button className="button-music" onClick={handleMute}>{muted ? <FaVolumeMute /> : <FaVolumeOff />}</button>
                    <button className="button-music" onClick={handleVolumeDown}><FaVolumeDown /></button>
                    <button className="button-music" onClick={handleVolumeUp}><FaVolumeUp /></button>
                    <button className="button-music" onClick={handleNext}><FaStepBackward /></button>
                    <button className="button-music" onClick={handlePrevious}><FaStepForward /></button>
                </div>
                <div className="song-info">
                    <span>Song: {songName} <br /></span>
                    <span>Duration: {formatTime(duration)} <br /> </span>
                    <span> Current Time:{" "} {formatTime(time)} <br /></span>
                    <span>Volume: {Math.round(volume * 100)}%</span>
                </div>
                <audio ref={audioRef} src={songs[currentSongIndex].file} />
            </div>
        </>
    );
}
