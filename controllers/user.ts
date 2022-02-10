import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { User } from "../src/entities/User";
import { generateAuthToken } from "../utils/tokenGenerator";

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
    const token = generateAuthToken(user.id.toString());

    res.status(201).send({ user, token });
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

    const token = generateAuthToken(user.id.toString());

    res.send({ user, token });
  } catch (err) {
    console.log(err);
  }
};
