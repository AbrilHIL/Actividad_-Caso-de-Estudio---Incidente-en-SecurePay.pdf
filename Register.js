export async function registerUser(username, password) {
  validatePassword(password);

  const secureHash = await hashPassword(password);

  await db.query(
    "INSERT INTO users (username, password_hash, hash_algo) VALUES (?, ?, ?)",
    [username, secureHash, "argon2id"]
  );

  logAuthEvent("REGISTER_SUCCESS", username);
}
