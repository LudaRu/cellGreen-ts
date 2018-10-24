export interface Addon {
    hello(): string;
}

export const helloInterface: Addon = require("../build/release/addon");