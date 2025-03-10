import express from "express";
import helmet from 'helmet';
import bodyParser from 'body-parser';
import  {InviteRoute}  from "./src/routes/InviteRoutes.js";
import {EventoRoute} from "./src/routes/EventoRoutes.js"
import { ConviteRoutes } from "./src/routes/ConviteRoutes.js";
import cors from "cors"
import {Presente} from "./src/routes/PresentesRoutes.js";


const { Router, Request, Response } = express;
const app = express();

const route = Router()
app.use(cors()); // ou configure com a origem específica
app.use(helmet())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
route.get('/', (req, res) => {
  res.json({ message: 'hello world with Typescript' })
})
app.use(route);

//app.use(cors({ origin: 'http://localhost:8081' }));
app.use('/convidado',InviteRoute);
app.use('/evento',EventoRoute);
app.use('/convite',ConviteRoutes)
app.use("/presente",Presente)
app.listen(3333, () => 'server running on port 3333');

