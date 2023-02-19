const JWT = require("jsonwebtoken");

// JWT
const exp = Math.floor(Date.now() / 1000) + 60 * 60; // -> 1 hours
const SECRET_KEY = "dksfsdufygsdufyg@'3i4";

const createToken = (email) => {
   const payload = {
      exp,
      email,
   };
   return JWT.sign(payload, SECRET_KEY);
};

const verifyToken = (token) => {
   return JWT.verify(token, SECRET_KEY, (error, decoded) => {
      if (decoded !== undefined) {
         return decoded;
      }
      throw new Error();
   });
};

module.exports = { createToken, verifyToken };
