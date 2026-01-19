export async function requireMFA(user) {
  if (user.mfa_enabled) {
    // Verificar 
    return true;
  }
}
