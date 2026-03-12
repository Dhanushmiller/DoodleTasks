const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const crypto = require("crypto");
const sendEmail = require("../utils/email");

class UserController {

  static async signup(req, res) {
  const { email, password, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO users (email, password, name) VALUES (?, ?, ?)";

  db.query(query, [email, hashedPassword, name], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({ message: "User registered successfully" });
  });
}

  static login(req, res) {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0)
        return res.status(404).json({ message: "User not found" });

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(401).json({ message: "Invalid password" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });

      res.json({ token });
    });
  }

  static updateUser(req, res) {
    const { name } = req.body;
    const userId = req.params.id;

    const query = "UPDATE users SET name = ? WHERE id = ?";

    db.query(query, [name, userId], (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User updated successfully" });
    });
  }

  static async updatePassword(req, res) {
    const { password } = req.body;
    const userId = req.params.id;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "UPDATE users SET password = ? WHERE id = ?";

    db.query(query, [hashedPassword, userId], (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Password updated successfully" });
    });
  }

  static forgotPassword(req, res) {

  const { email } = req.body;

  const query = "SELECT * FROM users WHERE email=?";

  db.query(query, [email], async (err, results) => {

    if (err) return res.status(500).json(err);

    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = results[0];

    const otp = Math.floor(100000 + Math.random() * 900000);

    const expiry = new Date(Date.now() + 300000); // 5 min

    const insertQuery =
      "INSERT INTO password_resets (user_id, otp, expiry) VALUES (?, ?, ?)";

    db.query(insertQuery, [user.id, otp, expiry], async (err) => {

      if (err) return res.status(500).json(err);

      const message = `Your OTP for password reset is: ${otp}`;

      await sendEmail(email, "Password Reset OTP", message);

      res.json({ message: "OTP sent to email" });

    });

  });


}

static async resetPassword(req, res) {

  const { email, otp, newPassword } = req.body;

  const userQuery = "SELECT * FROM users WHERE email=?";

  db.query(userQuery, [email], async (err, users) => {

    if (err) return res.status(500).json(err);

    if (users.length === 0)
      return res.status(404).json({ message: "User not found" });

    const userId = users[0].id;

    const otpQuery =
      "SELECT * FROM password_resets WHERE user_id=? AND otp=? AND expiry > NOW()";

    db.query(otpQuery, [userId, otp], async (err, results) => {

      if (err) return res.status(500).json(err);

      if (results.length === 0)
        return res.status(400).json({ message: "Invalid or expired OTP" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updateQuery = "UPDATE users SET password=? WHERE id=?";

      db.query(updateQuery, [hashedPassword, userId], (err) => {

        if (err) return res.status(500).json(err);

        res.json({ message: "Password reset successful" });

      });

    });

  });


}

}

module.exports = UserController;