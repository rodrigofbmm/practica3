import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { addBook, addAuthor, addUser} from "./resolvers/post.ts";
import { getBooks , getUser} from "./resolvers/get.ts";
import { deleteUser } from "./resolvers/delete.ts";


const router = new Router();

router
  .post("/addBook", addBook)
  .post("/addAuthor", addAuthor)
  .post("/addUser", addUser)
  .get("/getBooks", getBooks)
  .get("/getUser/:id", getUser)
  .delete("/deleteUser/:ID", deleteUser);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 7777 });

