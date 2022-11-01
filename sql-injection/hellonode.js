//Load HTTP module
const { appendFile } = require("fs");
const http = require("http");
const hostname = "127.0.0.1";
const port = 3001;

var mysql = require("mysql");

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      '<html><body><h1>SQL Injection</h1><form action="login" method="post"><input type="text" name="username" placeholder="username"><input type="password" name="password" placeholder="password"><input type="submit" value="Login"></form></body></html>'
    );
  }
  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  //res.setHeader("Content-Type", "text/plain");
  //res.end("Hello World\n");
  return res.end();
});

var con = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "mydb",
  port: 3307,
});

server.on("/login", function (req, res) {
  console.log(req);
  var username = req.query.username;
  var password = req.query.password;
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM users WHERE email = '" + email + "'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length > 0) {
        if (result[0].password == password) {
          res.send("Login Success");
        } else {
          res.send("Login Failed");
        }
      } else {
        res.send("Login Failed");
      }
    });
  });
});

server.on("/register", function (req, res) {
  var email = req.query.email;
  var password = req.query.password;
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO users (email, password) VALUES ('" +
      email +
      "', '" +
      password +
      "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send("Register Success");
    });
  });
});

//listen for request on port 3001, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("", function (err, result) {});
});
