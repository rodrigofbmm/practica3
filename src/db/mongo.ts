
import { MongoClient, Database } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { UserSchema, AuthorSchema, BookSchema } from "./schemas.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

await config({ export: true, allowEmptyValues: true });

const connectMongoDB = async (): Promise<Database> => {
  const mongo_usr = Deno.env.get("MONGO_USR");
  const mongo_pwd = Deno.env.get("MONGO_PWD");
  const mongo_url = `mongodb+srv://${mongo_usr}:${mongo_pwd}@cluster0.ern9y.mongodb.net/practica3?authMechanism=SCRAM-SHA-1`;

  const client = new MongoClient();
  await client.connect(mongo_url);
  const db = client.database(`practica3`);
  return db;
};

const db = await connectMongoDB();
console.info(`MongoDB practica3 connected`);

export const userCollection = db.collection<UserSchema>("users");
export const authorCollection = db.collection<AuthorSchema>("author");
export const bookCollection = db.collection<BookSchema>("book");