import { randomInt } from "node:crypto";

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const CODE_LENGTH = 8;

export function generateShortCode(): string {
    let code = ""

    // Generate a random 8-character string using characters from BASE62
    for (let i = 0; i < CODE_LENGTH; i++) {
        code += BASE62[randomInt(BASE62.length)]
    }
    return code
}