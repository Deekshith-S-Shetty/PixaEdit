import mongoose, {Mongoose} from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface mongooseConnection {
    con: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: mongooseConnection = (global as any).mongoose;

if(!cached) {
    cached = (global as any).mongoose = {con: null, promise: null};
}

export const connectToDatabase = async () => {
    if(cached.con) return cached.con;

    if(!MONGODB_URL) throw new Error ("MONGODB_URL is not set");

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {bufferCommands: false});
    }

    cached.con = await cached.promise;
    return cached.con;
}