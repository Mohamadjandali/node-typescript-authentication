import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer", "");

        if (!token) {
            return res.status(403).send();
        }

        const payload = jwt.verify(token, "SECRET_KEY");

        console.log(payload);

        next();
    } catch (err) {
        console.log(err);
    }
};
