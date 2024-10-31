import express from "express";
import helmet from 'helmet';
import bodyParser from 'body-parser';
import  {InviteRoute}  from "./src/routes/InviteRoutes.js";
import {EventoRoute} from "./src/routes/EventoRoutes.js"
const { Router, Request, Response } = express;
const app = express();

const route = Router()

app.use(helmet())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
route.get('/', (req, res) => {
  res.json({ message: 'hello world with Typescript' })
})
app.use(route);

app.use('/convidado',InviteRoute);
app.use('/evento',EventoRoute);
app.listen(3333, () => 'server running on port 3333');

