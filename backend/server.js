import http from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
import { json } from "co-body";

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });

      res.end("Cinema Nexus API is running");
      return;
    }

    if (req.method === "GET" && req.url === "/users") {
      const usersData = readFileSync("./data.json", "utf-8");
      const users = JSON.parse(usersData);

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify(users));
      return;
    }

    if (req.method === "POST" && req.url === "/register") {
      const body = await json(req);

      const usersData = readFileSync("./data.json", "utf-8");
      const users = JSON.parse(usersData);

      users.push(body);

      writeFileSync(
        "./data.json",
        JSON.stringify(users, null, 2)
      );

      res.writeHead(201, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify({
        message: "User registered successfully"
      }));

      return;
    }

    if (req.method === "POST" && req.url === "/login") {
      const body = await json(req);

      const usersData = readFileSync("./data.json", "utf-8");
      const users = JSON.parse(usersData);

      const user = users.find(function (user) {
        return (
          user.username === body.username &&
          user.password === body.password
        );
      });

      if (user) {
        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          message: "Login successful"
        }));
      } else {
        res.writeHead(401, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          message: "Invalid username or password"
        }));
      }

      return;
    }

    res.writeHead(404, {
      "Content-Type": "text/plain"
    });

    res.end("Route not found");
  } catch (error) {
    console.error(error);

    res.writeHead(500, {
      "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
      message: "Internal server error"
    }));
  }
});

server.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});