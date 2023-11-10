import { db } from "./dbConnect.js";

const coll = db.collection('recipes');

export async function createRecipe(req, res){ // Protect 
    let newRecipe = req.body;
    // Add user's id to the recipe 
    newRecipe.userId = req.locals.id;
    await coll.add(newRecipe);
    // Send something back
    getAllRecipes(req, res);
}


export async function getAllRecipes(req, res){
    const recipeColl = await coll.get();
    const recipes = recipeColl.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(recipes);
}