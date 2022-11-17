
import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { user, book , author} from "../types.ts";

export type UserSchema = user & {
  _id: ObjectId;
};

export type AuthorSchema = author & {
  _id: ObjectId;
};

export type BookSchema = Omit<book, "ISBN"> & {
    _id: ObjectId;
};