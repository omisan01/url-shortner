import { describe, expect, it } from 'vitest';
import { generateShortCode } from "./base62.util.js"

describe('generateShortCode', () => {
    it('should generate a short code of length 8', () => {
        const code = generateShortCode();
        expect(code).toHaveLength(8);
    })

    it('should generate a short code containing only base62 characters', () => {
        const code = generateShortCode();
        const base62Regex = /^[0-9a-zA-Z]+$/;
        expect(base62Regex.test(code)).toBe(true);
    })
});