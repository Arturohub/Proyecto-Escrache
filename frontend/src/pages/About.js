import React, { useState } from "react";
import guitarra from "../images/band/guitarra.jpg";
import bajo from "../images/band/bajo.jpg";
import bateria from "../images/band/bateria.jpg";
import cantante from "../images/band/cantante.jpg";
import { GiGuitar, GiGuitarBassHead, GiDrumKit, GiMicrophone } from "react-icons/gi";


export default function About() {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleIconClick = (member) => {
    setSelectedMember(member === selectedMember ? null : member);
  };

  return (
    <div className="about-container">
        <div className="musician">
          <GiMicrophone className="music-icon" onClick={() => handleIconClick("singer")} />
          {selectedMember === "singer" && (
            <>
              <img src={cantante} alt="Isidro" />
              <h1>Isidro</h1>
            </>
          )}
        </div>

        <div className="musician">
          <GiGuitar className="music-icon" onClick={() => handleIconClick("guitarist")} />
          {selectedMember === "guitarist" && (
            <>
              <img src={guitarra} alt="Billy" />
              <h1>Billy</h1>
            </>
          )}
        </div>

        <div className="musician">
          <GiGuitarBassHead className="music-icon" onClick={() => handleIconClick("bassist")} />
          {selectedMember === "bassist" && (
            <>
              <img src={bajo} alt="Migue" />
              <h1>Migue</h1>
            </>
          )}
        </div>

        <div className="musician">
          <GiDrumKit className="music-icon" onClick={() => handleIconClick("drummer")} />
          {selectedMember === "drummer" && (
            <>
              <img src={bateria} alt="Dani" />
              <h1>Dani</h1>
            </>
          )}
        </div>
    </div>
  );
}
