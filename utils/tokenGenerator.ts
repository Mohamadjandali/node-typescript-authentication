import * as jwt from "jsonwebtoken";

export const generateAuthToken = (userId: string) => {
    const payload = {
        id: userId,
    };

    return jwt.sign(payload, "SECRET_KEY", { expiresIn: "1h" });
};
