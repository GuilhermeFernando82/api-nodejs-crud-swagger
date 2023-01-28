import express, {Request, Response} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRoutes from './routes/api';
import bodyParser from 'body-parser';
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

dotenv.config();

const server = express();

server.use(cors({
    origin: '*'
}));
server.use(bodyParser.json());
// parse various different custom JSON types as JSON
server.use(bodyParser.json({ type: 'application/*+json' }));
// parse some custom thing into a Buffer
server.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
server.use(bodyParser.text({ type: 'text/html' }));
// parse an text body into a string
server.use(bodyParser.text({ type: 'text/plain' }));
// create application/x-www-form-urlencoded parser
server.use(bodyParser.urlencoded({ extended: false }));
const options = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "REST API for Swagger Documentation",
        version: "1.0.0",
      },
      schemes: ["http", "https"],
      servers: [{ url: "http://localhost:3000/api" }],
    },
    apis: [
      `${__dirname}/routes/example-route.ts`,
      "./dist/routes/example-route.js",
    ],
  };
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use(mainRoutes);
server.use((req: Request, res: Response) => {
    res.status(404).send('Endpoint não encontrado.');
});

server.listen(process.env.PORT);