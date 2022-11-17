import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { userCollection } from "../db/mongo.ts";

type deleteUserContext = RouterContext<
    "/deleteUser/:ID",
    {
        ID: string;
    } & Record<string | number, string | undefined>,
    Record<string, any>
>;

export const deleteUser =async (context:deleteUserContext) => {
    try{
        if (context.params?.ID){
            const eliminar = await userCollection.deleteOne({
                _id: new ObjectId(context.params.ID),
            });

            if(eliminar){
                context.response.status = 200;
            }else{
                context.response.status = 404;
            }
        }

    } catch (e){
        console.error(e);
        context.response.status = 500;
    }
    
}
