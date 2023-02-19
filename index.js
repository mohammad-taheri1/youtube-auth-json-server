const fs = require("fs");
const jsonServer = require("json-server");
const { v4: uuidv4 } = require("uuid");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const usersFilePath = "./users.json";

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Remember
// JSON.stringify() -> convert JS Object to string
// JSON.parse() -> convert string to JS Object

const isExistUser = (email) => {
   const users = JSON.parse(fs.readFileSync(usersFilePath));
   const userIndex = users.findIndex((user) => user.email === email);
   return userIndex !== -1;
};

const isValidUserDate = (email, password) => {
   const users = JSON.parse(fs.readFileSync(usersFilePath));
   const userIndex = users.findIndex((user) => user.email === email && user.password === password);
   return userIndex !== -1;
};

// API Route :: Users List -> GET
server.get("/users", (req, res) => {
   fs.readFile(usersFilePath, (error, fileData) => {
      if (error) {
         return res.status(500).send(error);
      }
      let usersArray = JSON.parse(fileData);

      const filteredArray = usersArray.map((user) => {
         return {
            id: user.id,
            email: user.email,
         };
      });

      return res.status(200).send(filteredArray);
   });
});

// API Route :: Register -> POST
server.post("/auth/register", (req, res) => {
   // Validations
   // Is email and password exists in request.body ?
   if (!req.body || !req.body?.email || !req.body?.password) {
      return res.status(400).send("Bad Request, please provide an email and a password");
   }
   const { email, password } = req.body;
   // Is email exists in users.json file?
   // isExistUser functionality
   if (isExistUser(email)) {
      return res.status(409).send("Email already exists");
   }
   // Validation is ok and we can save new user
   fs.readFile(usersFilePath, (error, fileData) => {
      if (error) {
         return res.status(500).send(error);
      }
      //
      const usersArray = JSON.parse(fileData);
      const newUser = {
         id: uuidv4(),
         email,
         password,
      };
      usersArray.push(newUser);
      //
      fs.writeFile(usersFilePath, JSON.stringify(usersArray), (error, result) => {
         if (error) {
            return res.status(500).send(error);
         }
      });
      //
      return res.status(201).send(`User created successfully with id of: ${newUser.id}`);
   });
});

// API Route :: Login -> POST
server.post("/auth/login", (req, res) => {
   // Validations
   // Is email and password exists in request.body ?
   if (!req.body || !req.body?.email || !req.body?.password) {
      return res.status(400).send("Bad Request, please provide an email and a password");
   }
   const { email, password } = req.body;
   // Is user valid with this email and this password
   if (!isValidUserDate(email, password)) {
      return res.status(401).send("Incorrect Credentials");
   }
   // email and password is correct and we need to create a token and send it back to user
});

//
server.use(router);

//
server.listen(8200, () => {
   console.log("JSON Server is running on port 8200");
});
