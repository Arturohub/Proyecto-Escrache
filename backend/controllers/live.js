const jwt = require('jsonwebtoken');
const db = require("../db");

const addLive = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (![1, 2, 3, 4].includes(userInfo.id)) {
      return res.status(403).json("You are not authorized to publish new upcoming concerts.");
    }
    
    const { festival_name, city, date, time } = req.body;
    const query = 'INSERT INTO concerts (`festival_name`, `city`, `date`, `time`) VALUES (?, ?, ?, ?)';
    db.query(query, [festival_name, city, date, time], (err, result) => {
      if (err) {
        return res.status(500).send('Error adding concert');
      } else {
        return res.status(201).send('New concert added successfully');
      }
    });
  });
};

const getPreviousLive = (req, res) => {
  const query = 'SELECT * FROM concerts WHERE date < CURRENT_DATE()';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching previous concerts');
    } else {
      return res.status(200).json(results);
    }
  });
};

const getUpcomingLive = (req, res) => {
  const query = 'SELECT * FROM concerts WHERE date >= CURRENT_DATE()';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching upcoming concerts');
    } else {
      return res.status(200).json(results);
    }
  });
};


/* PARA ACTUALIZAR CONCIERTOS, AÑADIR SI HAY TIEMPO

const updateLive = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (![1, 2, 3, 4].includes(userInfo.id)) {
      return res.status(403).json("You are not authorized to edit concerts.");
    }

    const { id, festival_name, city, date, time } = req.body;
    if (!id) {
      return res.status(400).json("Concert ID is required for editing.");
    }

    const query = 'UPDATE concerts SET festival_name = ?, city = ?, date = ?, time = ? WHERE id = ?';
    db.query(query, [festival_name, city, date, time, id], (err, result) => {
      if (err) {
        return res.status(500).send('Error updating concert');
      } else {
        return res.status(200).send('Concert updated successfully');
      }
    });
  });
};

*/



module.exports = { addLive, getUpcomingLive, getPreviousLive };
