import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { User } from "../src/entities/User";

type RequestBody = {
  username: string;
  email: string;
  password: string;
  id: number;
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body as RequestBody;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = User.create({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { body } = req;
  const { email, password } = body as RequestBody;
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
};
