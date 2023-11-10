import jwt from "jsonwebtoken";
import { secretKey } from "./creds.js";


export async function isAuthenticated(req, res, next) {
    const { authorization } = req.headers;
    //first check if they HAVE a token:
    if (!authorization) {
        res.send(401).send({ message: 'No authorization token found' })
        return;
    }
    // then check if the token is VALID:
    jwt.verify = jwt.decode(authorization, secretKey, (err, decoded) {
        if (err) {
            res.status(401).send(err);
            return;
        }

        // Valid token:
        req.locals = decoded; // attach out decoded token to the request
        // if so, go on
        next();
    });
}