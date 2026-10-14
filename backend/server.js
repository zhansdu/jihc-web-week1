import http from "http";
import parse from "co-body";
import pg from "pg";

const { Pool } = pg;
const PORT = 3000;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "bekasyl",
});

const server = http.createServer(async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (req.method === "GET" && req.url === "/users") {
      const result = await pool.query(
        "SELECT id, name, email, password FROM users ORDER BY id",
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result.rows));
    } else if (req.method === "POST" && req.url === "/register") {
      const newUser = await parse.json(req);

      await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [newUser.name, newUser.email, newUser.password],
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User registered" }));
    } else if (req.method === "POST" && req.url === "/login") {
      const loginUser = await parse.json(req);

      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1 AND password = $2",
        [loginUser.email, loginUser.password],
      );

      const foundUser = result.rows[0];

      if (foundUser) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Login successful" }));
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Invalid email or password" }));
      }
    } else if (req.method === "PUT" && req.url === "/users") {
      const data = await parse.json(req);

      await pool.query("UPDATE users SET name = $1 WHERE id = $2", [
        data.name,
        data.id,
      ]);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Username updated successfully" }));
    } else if (req.method === "DELETE" && req.url === "/users") {
      const data = await parse.json(req);

      await pool.query("DELETE FROM users WHERE id = $1", [data.id]);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User deleted successfully" }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not found" }));
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
