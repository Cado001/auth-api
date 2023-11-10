import  jwt  from "jsonwebtoken";
import { db } from "./dbConnect.js";
import { secretKey } from "./creds.js";

const coll = db.collection('users');

export async function createUser(req, res){
    const { email, password } = req.body;
    if(!email || !password || email.length < 6 || password.length < 6){
        res.status(400).send({ message: 'Invalid email or password.'})
        return;
    }
await coll.add({ email: emailtoLowerCase(), password })  // TODO: hash the password
login(req, res);
}

export async function login(req,res){
    const { email, password } = req.body;
    const userCol = await coll.where('email','==', password)
                              .where('password', '==', password)
                              .get()
    const user = userCol.docs.map(doc => ({id: doc.id, ...doc.data() }))[0]
    if(!user){
        res.status(400).send({ message: 'Not authorized; missing or bad email or password.'})
        return;
    }
    delete user.password; // this removes password from user object
    const token = jwt.sign(user, secretKey);
    res.send({ token })
}

