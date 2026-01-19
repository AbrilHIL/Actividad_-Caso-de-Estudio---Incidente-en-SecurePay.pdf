export async function loginUser(username, password) {
  const user = await db.query(
    "SELECT password_hash, hash_algo FROM users WHERE username = ?",
    [username]
  );

  if (!user) {
    logAuthEvent("LOGIN_FAIL", username, { reason: "USER_NOT_FOUND" });
    throw new Error("Credenciales inválidas");
  }

  // Caso legado: MD5
  if (user.hash_algo === "md5") {
    const md5Hash = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    if (md5Hash !== user.password_hash) {
      logAuthEvent("LOGIN_FAIL", username, { reason: "BAD_PASSWORD_MD5" });
      throw new Error("Credenciales inválidas");
    }

    // Migración automtica
    const newHash = await hashPassword(password);

    await db.query(
      "UPDATE users SET password_hash = ?, hash_algo = ? WHERE username = ?",
      [newHash, "argon2id", username]
    );

    logAuthEvent("PASSWORD_REHASHED", username);
    return { status: "OK", migrated: true };
  }

  // Caso moderno Argon2id
  const valid = await verifyPassword(user.password_hash, password);

  if (!valid) {
    logAuthEvent("LOGIN_FAIL", username, { reason: "BAD_PASSWORD" });
    throw new Error("Credenciales inválidas");
  }

  logAuthEvent("LOGIN_SUCCESS", username);
  return { status: "OK", migrated: false };
}
