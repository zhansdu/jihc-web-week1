const http = require("http");
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "data.json");
const PORT = 3000;

function readUsers() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  const parsed = JSON.parse(raw);
  return parsed.users;
}

function writeUsers(users) {
  const data = { users: users };
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/users") {
    const users = readUsers();
    res.writeHead(200);
    res.end(JSON.stringify(users));
    return;
  }

  if (req.method === "POST" && req.url === "/register") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const newUser = JSON.parse(body);

      if (!newUser.name || !newUser.email || !newUser.password) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            success: false,
            message: "Барлық өрісті толтырыңыз",
          }),
        );
        return;
      }

      const users = readUsers();

      const exists = users.some(
        (u) => u.email.toLowerCase() === newUser.email.toLowerCase(),
      );

      if (exists) {
        res.writeHead(400);
        res.end(
          JSON.stringify({ success: false, message: "Бұл email тіркелген" }),
        );
        return;
      }

      users.push(newUser);
      writeUsers(users);

      res.writeHead(200);
      res.end(JSON.stringify({ success: true, message: "Тіркелу сәтті өтті" }));
    });

    return;
  }

  if (req.method === "POST" && req.url === "/login") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const { email, password } = JSON.parse(body);
      const users = readUsers();

      const found = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );

      if (found) {
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, user: found }));
      } else {
        res.writeHead(401);
        res.end(
          JSON.stringify({
            success: false,
            message: "Email немесе құпия сөз қате",
          }),
        );
      }
    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Табылмады" }));
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
