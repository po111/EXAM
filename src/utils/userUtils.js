import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";

export function generateAuthToken(user) {
    const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        const token =  jsonwebtoken.sign(payload, JWT_SECRET, {expiresIn: '2h'});

        return token;
}