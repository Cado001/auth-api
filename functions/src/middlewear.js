import  jwt  from "jsonwebtoken";
import { secretKey } from "./creds.js";


export async function isAuthenticated(req, res, next){
    const { authorization } = req.headers;
    //first check if they HAVE a token:
    if(!authorization) {
        res.send(401).send({ message: 'No authorization token found' })
        return;
    }
    // then check if the token is VALID:
    jwt.verify = jwt.decode(authorization, secretKey)
       .then(decoded => { // valid token
        req.locals = decoded; //attach our decoded token to the request...
           // If so, go on
        next();

       })
       .catch(err => {  // not valid token 
        res.status(401).send(err);
       })
}