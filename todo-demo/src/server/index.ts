import express from "express";
import { api } from "./api";
import { auth } from "./auth";
import session from 'cookie-session';

const app = express();
app.use(session({
  secret:'my secret'
}))
app.use(auth);
app.use(api);

app.listen( 3002, () => console.log("Started"));