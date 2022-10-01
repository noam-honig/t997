import express from "express";
import { api } from "./api";
import { auth } from "./auth";
import session from 'cookie-session';
import path from 'path';

const app = express();
app.use(session({
  secret: process.env['SESSION_SECRET'] && 'my secret'
}))
app.use(auth);
app.use(api);

app.use(express.static(path.join(__dirname, '../')));
app.get('/*', (_, res) => {
  res.send(path.join(__dirname, '../', 'index.html'));
})

app.listen(process.env["PORT"] || 3002, () => console.log("Started"));