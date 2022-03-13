"use strict";

import express from "express";
import router from "./router.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 9000;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Listening on http://${host}:${port}`));
