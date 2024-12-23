import { MongoClient } from "mongodb";
import { Form } from "~/types/form";

export const mongoClient = new MongoClient("mongodb://localhost:27017");

export const db = mongoClient.db("forap");

export const formCollection = db.collection<Form>("forms");
