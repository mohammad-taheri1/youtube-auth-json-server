const { verifyToken } = require("../utils/auth-utils");

const authMiddleware =  (req, res, next) => {
    // Validate if the request has the authorization header
    const { headers } = req;
    if (headers.authorization === undefined || headers.authorization.split(" ")[0] !== "Bearer") {
       return res.status(403).send("Unauthorized request");
    }
    try {
       const verifyResult = verifyToken(headers.authorization.split(" ")[1]);
       console.log({ verifyResult });
       next();
    } catch (error) {
       return res.status(403).send(error);
    }
 }

 module.exports = authMiddleware;