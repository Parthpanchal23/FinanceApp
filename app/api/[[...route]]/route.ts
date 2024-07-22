import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";
import authors from "./authors";
import books from "./books";

const app = new Hono().basePath("/api");

app.route("/authors", authors);
app.route("/books", books);

export const GET = handle(app);
export const POST = handle(app);
