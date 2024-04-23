const db = require("../db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");


const register = async (req, res) => {
    try {
        const { username, email, password, image } = req.body;

        const checkQ = "SELECT * FROM users WHERE email=? OR username = ?";
        db.query(checkQ, [email, username], (err, data) => {
            if (err) return res.status(500).json({ error: err });

            if (data.length) return res.status(409).json("User already exists");

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const insertQ = "INSERT INTO users(`username`, `email`, `password`, `image`) VALUES (?, ?, ?, ?)";
            const values = [username, email, hash, image];

            db.query(insertQ, values, (err, data) => {
                if (err) return res.status(500).json({ error: err });
                return res.status(200).json("User has been created successfully");
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to register user.' });
    }
};


const login = (req, res) => {

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        
        if (data.length === 0) {
            return res.status(404).json("User not found. Please register first!");
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json("Incorrect password. Please, try again!");

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);
        const { password, ...other } = data[0];

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(other);
    });
};


const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logout")
}

const forgotPassword = (req, res) => {

    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length === 0) {
            return res.status(404).json("User not found. Please register first!");
        }

        const resetToken = jwt.sign({ email: req.body.email }, process.env.RESET_TOKEN_SECRET, { expiresIn: "1h" });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Password Reset Request",
            html: `
                <p>Hello ${data[0].username},</p>
                <p>You requested a password reset. Click the link below to reset your password:</p>
                <a href="https://proyectoescrache.onrender.com/reset-password?token=${resetToken}">Reset Password</a>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json("Failed to send reset email.");
            }
            console.log("Email sent: " + info.response);
            return res.status(200).json("Password reset email sent successfully.");
        });
    });
};

const resetPassword = (req, res) => {
    const { token, password } = req.body;

    jwt.verify(token, process.env.RESET_TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
            return res.status(400).json("Invalid or expired token. Please try again.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
        db.query(updateQuery, [hashedPassword, decodedToken.email], (updateErr, updateResult) => {
            if (updateErr) {
                return res.status(500).json({ error: "Failed to send reset email.", details: error.message });
            }
            return res.status(200).json("Password updated successfully.");
        });
    });
};

module.exports = { register, login, logout, forgotPassword, resetPassword};