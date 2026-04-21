const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./database.db");

// TABLE
db.run(`CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY,
  username TEXT,
  login_time TEXT,
  action TEXT
)`);

// LOGIN (simple demo)
app.post("/login", async (req, res) => {
  const { username } = req.body;
  res.json({ token: "demo", user: username });
});

// LOG CALCULATIONS
app.post("/logs/calc", (req, res) => {
  const { user, tpg, quote, decision } = req.body;

  db.run(
    "INSERT INTO logs (username, login_time, action) VALUES (?, datetime('now'), ?)",
    [user, `TPG:${tpg} | Quote:${quote} | Decision:${decision}`]
  );

  res.send("Logged");
});

// GET LOGS (ADMIN)
app.get("/logs", (req, res) => {
  db.all("SELECT * FROM logs ORDER BY login_time DESC", [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(5000, () => console.log("Server running on 5000"));
app.post("/logs/calc", (req, res) => {
  const { user, timestamp, tpg, quote, decision } = req.body;

  db.run(
    "INSERT INTO logs (username, login_time, action) VALUES (?, ?, ?)",
    [user, timestamp, `TPG:${tpg} Quote:${quote} Decision:${decision}`]
  );

  res.send("Logged");
});

app.listen(5000, () => console.log("Server running on port 5000"));