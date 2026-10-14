import http from "http"
import fs from "fs"
import {json} from "co-body"

const server = http.createServer(async(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.url === "/register" && req.method === "POST") {


    let body = "";
    body = await json(req)
    
    
    

       


            let data = fs.readFileSync("./data.json", "utf-8");

            data = JSON.parse(data);
    const user = data.find(user => user.email === body.email);
        if (!user){
            data.push(body);

            fs.writeFileSync(
                "./data.json",
                JSON.stringify(data, null, 2)
            );

            res.writeHead(200, {
                "Content-Type":"application/json"
            })

            res.end(JSON.stringify({
                message: "User registered"
            }));

        }else{
            res.writeHead(409, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "This email already exist"
            }));
        }
            
      
   
} else if (req.url === "/login" && req.method === "POST") {

    let body = "";
    body = await json(req);

        let data = fs.readFileSync("./data.json", "utf-8");
        data = JSON.parse(data);
      
        const user = data.find((user) => {
            return user.email === body.email &&
                   user.password === body.password;
        });
       

        if (user) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "You're successfully logged in"
            }));

        } else {
            res.writeHead(401, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Username or password is incorrect"
            }));
        }
   
} else if (req.url === "/users" && req.method === "GET") {
    let data = fs.readFileSync("./data.json", "utf-8");
    res.end(data)

  } else {
    res.end("This page doesn't exist");
  }
});

server.listen(5000, () => {
  console.log("Server successfully at port 5000");
});