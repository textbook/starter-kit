import { MongoClient } from "mongodb";

const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/cyf";
const configuration = { useNewUrlParser: true, useUnifiedTopology: true };

export const getClient = () => new MongoClient(dbUrl, configuration);
