import express from "express";

import databaseConnection from "./database";

import router from "../routes/user";

const app = express();

const main = async () => {
  try {
    await databaseConnection();

    app.use(express.json());

    app.use("/api/user", router);

    app.listen(5000, () => console.log("listening on port: 5000"));
  } catch (err) {
    console.log(err);
  }
};

main();
