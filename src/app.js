import express from "express";

import appRouter from "./routers/app.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(appRouter);

export default app;
