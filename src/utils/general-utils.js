const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const isExistUser = (email, usersFilePath) => {
   const users = JSON.parse(fs.readFileSync(usersFilePath));
   const userIndex = users.findIndex((user) => user.email === email);
   return userIndex !== -1;
};

const isValidUserDate = (email, password, usersFilePath) => {
   const users = JSON.parse(fs.readFileSync(usersFilePath));
   const userIndex = users.findIndex((user) => user.email === email && user.password === password);
   return userIndex !== -1;
};

const deletePasswordColumnFromUsersArray = (usersArray) => {
   const filteredArray = usersArray.map((user) => {
      return {
         id: user.id,
         email: user.email,
      };
   });

   return filteredArray;
};

const creteNewUserObject = (email, password) => {
   const newUser = {
      id: uuidv4(),
      email,
      password,
   };

   return newUser;
};

module.exports = { isExistUser, isValidUserDate, deletePasswordColumnFromUsersArray, creteNewUserObject };
