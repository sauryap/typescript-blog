const express = require("express");

import { connect } from "mongoose";
import { Request, Response, Express } from "express";
import { router } from "./route/index";

const app = express();

require("dotenv").config();
const PORT: number | string = process.env.PORT || 3000;
const URI = process.env.MONGO_URL as string;
app.use(express.json());

app.use("/api/", router);

app.listen(PORT, async () => {
  try {
    await connect(URI);
    console.log("db connected successfully");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running at ${PORT}`);
});
