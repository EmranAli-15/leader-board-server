require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URI;
import { Collection, Db } from "mongodb";
import { app, port } from "./app"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



let DB: Db;

// Collections------------Collections------------
export let UserCollection: Collection;
export let ScoreCollection: Collection;
// Collections------------Collections------------

async function main() {
    try {
        app.listen(port, () => {
            console.log(`App is running on port: ${port}`)
        })

        await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        DB = client.db("Leader-Board");

        // Collections------------Collections------------
        UserCollection = DB.collection("user");
        ScoreCollection = DB.collection("score");
        // Collections------------Collections------------


    } catch (error) {
        await client.close();
    }
}

main();