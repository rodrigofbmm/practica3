import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";
import { bookCollection, userCollection } from "../db/mongo.ts";

type GetBooksContext = RouterContext<
    "/getBooks",
    Record<string | number, string | undefined>,
    Record<string, any>
>;

type GetUserContext = RouterContext<
  "/getUser/:id",
  {
    id: string;
  } & Record<string | number, string | undefined>,
  Record<string, any>
>;

export const getBooks = async (context:GetBooksContext) => {
    try{
   

      const params = getQuery(context, { mergeParams: true });

      if(!params.page) throw new Error("pages Error.");
      

      const books = await bookCollection.find({
        title: { $eq: params?.title },
      })
      
      if (books) {
        context.response.status = 200;
        context.response.body = books;
      } else {
        context.response.status = 404;
        }

    } catch (e) {
      console.error(e);
      context.response.status = 500;
    }
    
}

export const getUser =async (context:GetUserContext) => {
    try{
      if (context.params?.id){
        const id = await userCollection.findOne({
            _id: new ObjectId(context.params.id)
        });
  
        if(id){
          context.response.body = id;
          context.response.status = 200;
        }
        else {
          context.response.status = 404;
        }
      }
    } catch(e){
      console.error(e);
      context.response.status = 500;
    }
    
  }