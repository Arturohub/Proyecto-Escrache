const db = require("../db");
const jwt = require("jsonwebtoken")

const getPosts = (req, res) => {
    const q = req.query.category ? "SELECT * FROM posts WHERE category=? ORDER BY date DESC" : "SELECT * FROM posts ORDER BY date DESC"

    db.query(q, [req.query.category], (err,data) => {
        if (err) return res.status(500).send(err)

        return res.status(200).json(data)
    })
}

const getPost = (req, res) => {
    const q = "SELECT p.id,`username`, `title`, `desc`, p.img , u.img AS userImg, `category`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (![1, 2, 3, 4].includes(userInfo.id)) {
      return res.status(403).json("You are not authorized to publish blog posts.");
  }

    const q = "INSERT INTO posts(`title`, `desc`, `img`, `category`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.category,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
}

const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.params.id;
      const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
  
      db.query(q, [postId, userInfo.id], (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json("An error occurred while deleting the post.");
        }
  
        if (data.affectedRows === 0) {
          return res.status(404).json("Post not found or you're not the owner of the post.");
        }
  
        return res.json("Post has been deleted!");
      });
    });
  };
  
const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`category`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.category];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
}



module.exports = { addPost, getPost, getPosts, updatePost, deletePost };