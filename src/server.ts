require('dotenv').config();
import { MongoClient, ServerApiVersion, Db, Collection } from "mongodb";
import { app } from "./app";
const port = 5000;

const uri = process.env.DB_URI as string;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let DB: Db;

// Collections
export let UserCollection: Collection;
export let ScoreCollection: Collection;

let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    await client.connect();
    console.log("MongoDB connected");

    DB = client.db("Leader-Board");

    UserCollection = DB.collection("user");
    ScoreCollection = DB.collection("score");

    isConnected = true;
}

// 🔹 Local + Vercel compatible
async function main() {
    try {
        await connectDB();

        // Only listen locally
        if (!process.env.VERCEL) {
            app.listen(port, () => {
                console.log(`App is running on port: ${port}`);
            });
        }

    } catch (error) {
        console.error("Startup error:", error);
        await client.close();
    }
}

// Local startup
main();

// 👉 Required for Vercel
export default async function handler(req: any, res: any) {
    await connectDB();
    return app(req, res);
}
