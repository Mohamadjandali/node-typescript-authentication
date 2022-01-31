import { createConnection } from "typeorm";

import { User } from "./entities/User";

const databaseConnection = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "code2002",
      database: "test_1",
      entities: [User],
      synchronize: true,
    });

    console.log("connected to database");
  } catch (err) {
    console.log(err);
  }
};

export default databaseConnection;
