import zxcvbn from "zxcvbn";

export function validatePassword(password) {
  const MIN_LENGTH = 12;
  const strength = zxcvbn(password);

  if (password.length < MIN_LENGTH) {
    throw new Error("La contraseña debe tener al menos 12 caracteres");
  }

  if (strength.score < 3) {
    throw new Error("La contraseña es demasiado débil");
  }

  return true;
}
