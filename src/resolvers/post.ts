import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { AuthorSchema, BookSchema, UserSchema } from "../db/schemas.ts";
import { user, book , author} from "../types.ts";
import { userCollection , authorCollection, bookCollection } from "../db/mongo.ts";

type PostAddBookContext = RouterContext<
  "/addBook",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

type PostAddAuthorContext = RouterContext<
  "/addAuthor",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

type PostAddUserContext = RouterContext<
  "/addUser",
  Record<string | number, string | undefined>,
  Record<string, any>
>;


export const addBook = async (context: PostAddBookContext): Promise<void> => {
    try {
      const result = context.request.body({ type: "json" });
      const value: book = await result.value;
      if (!value?.title || !value?.pages || !value?.author) {
        context.response.status = 406;
        return;
      }
  
      const { author } = value;


      const book: Partial<book> = {
        ...value,
        ISBN: crypto.randomUUID(),
      };

      // check if slot is already booked
     const foundAuthor = await authorCollection.findOne({ author });
      if (foundAuthor) {
        authorCollection.updateOne({name: value.author}, {$set:{books: book.ISBN}});
        return;
      } 
  
      await bookCollection.insertOne(book as BookSchema);
      const { _id, ...slotWithoutId } = book as BookSchema;
      context.response.body = slotWithoutId;
      
    } catch (e) {
      console.error(e);
      context.response.status = 500;
    }
};

export const addAuthor = async (context: PostAddAuthorContext): Promise<void> => {
  try {
    const result = context.request.body({ type: "json" });
    const value: author = await result.value;
    if (!value?.name) {
      context.response.status = 406;
      return;
    }

    const author: Partial<author> = {
      ...value
    };

    await authorCollection.insertOne(author as AuthorSchema);
    const { _id, ...slotWithoutbooks } = author as AuthorSchema;
    context.response.body = slotWithoutbooks;
    
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};


export const addUser = async (context: PostAddUserContext): Promise<void> => {
  try {
    const date1 = new Date();
    const result = context.request.body({ type: "json" });
    const value: user = await result.value;
    if (!value?.name || !value?.email || !value?.password) {
      context.response.status = 406;
      return;
    }

    const user: Partial<user> = {
      ...value,
      createdAt: date1.toDateString()
    };

    await userCollection.insertOne(user as UserSchema);
    const { _id, ...slotWithoutcart } = user as UserSchema;
    context.response.body = slotWithoutcart;
    
  } catch (e) {
    console.error(e);
    context.response.status = 500;
  }
};