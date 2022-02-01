import { Router } from "express";
import bcrypt from "bcrypt";

import { User } from "../src/entities/User";

const router = Router();
type RequestBody = {
  username: string;
  email: string;
  password: string;
  id: number;
};

router.post("/signup", async (req, res) => {
  const { body } = req;
  try {
    const { username, email, password } = body as RequestBody;
    const user: User = User.create({
      username,
      email,
      password,
    });

    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body as RequestBody;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Email or Password is incorrect!");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      throw new Error("Email or Password is incorrect!");
    }

    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

export default router;
