import argon2 from "argon2";

const ARGON_CONFIG = {
  type: argon2.argon2id,
  memoryCost: 65536,   // 64 MB
  timeCost: 3,
  parallelism: 2
};

export async function hashPassword(password) {
  return await argon2.hash(password, ARGON_CONFIG);
}

export async function verifyPassword(hash, password) {
  return await argon2.verify(hash, password);
}
