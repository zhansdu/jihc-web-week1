import http from "http";
import { json } from "co-body";
import fs from "fs";

function getUsers() {
  if (!fs.existsSync("users.json")) return [];
  const data = fs.readFileSync("users.json", "utf-8");
  return JSON.parse(data);
  // if not return, pie exists but you do not give it to the people
}
function saveUsers(user) {
  fs.writeFileSync("users.json", JSON.stringify(user));
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
    // surak koigan adamga otvet berip kaitaryp jiberu
  }

  if (req.url === "/users" && req.method === "GET") {
    const users = getUsers();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(users));
    return;
  }

  if (req.url === "/register" && req.method === "POST") {
    const body = await json(req);
    const users = getUsers();

    const alreadyExists = users.find((u) => u.email === body.email);
    if (alreadyExists) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Email already exists" }));
      return;
      // alreadyexists userlerdy kaitadan kosa beredi return bolmasa
    }
    users.push(body);
    saveUsers(users);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Account created successfully!!!" }));
  } else if (req.url === "/login" && req.method === "POST") {
    const users = getUsers();
    const body = await json(req);
    const found = users.find(
      (u) => u.password === body.password && u.email === body.email,
    );
    if (found) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: `Welcome ${found.username}!` }));
    } else {
      res.writeHead(401, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Incorrect password or email" }));
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});
server.listen(3000, () => console.log("listening to 3000..."));
