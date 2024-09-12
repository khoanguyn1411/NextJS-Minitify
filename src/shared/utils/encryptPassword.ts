import { scrypt, randomBytes } from "crypto";

// Package 'bscript' and 'argon2' is not work within nextjs.
// There are some errors when using them, so create own services to encrypt password.
export namespace PasswordEncryption {
  export function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(16).toString("hex");
      scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ":" + derivedKey.toString("hex"));
      });
    });
  }

  export function verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":");
      scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key === derivedKey.toString("hex"));
      });
    });
  }
}
