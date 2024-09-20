// const express = require("express");
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/user/user.routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(StudentRoute);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
