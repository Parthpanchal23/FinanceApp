import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";
// import authors from "./authors";
// import books from "./books";
import accounts from "./accounts";
// import { HTTPException } from "hono/http-exception";

const app = new Hono().basePath("/api");

// app.get("/hello", (c: any) => {
//   return c.Json({ hwllo: "world" });
// });
// app.route("/authors", authors);
// app.route("/books", books);

// app.onError((err, c) => {
//   if (err instanceof HTTPException) {
//     return err.getResponse();
//   }
//   return c.json({ error: "Internal error" }, 500);
// });
const routes = app.route("/accounts", accounts);
export const GET = handle(app);
export const POST = handle(app);

// RPC
export type AppType = typeof routes;
