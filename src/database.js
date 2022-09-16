import mongoose from "mongoose";
const URI = require("./config").URI;

export async function connectionDB() {
    try {
        const database = await mongoose.connect(URI);
        console.log('Database is connected to:', database.connection.name);
    } catch (err) {
        console.error(err);
    }
}