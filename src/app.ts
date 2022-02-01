import express from "express";

import databaseConnection from "./database";

const app = express();

const main = async () => {
  try {
    databaseConnection();
    app.listen(5000, () => console.log("listening on port: 5000"));
  } catch (err) {
    console.log(err);
  }
};

main();
