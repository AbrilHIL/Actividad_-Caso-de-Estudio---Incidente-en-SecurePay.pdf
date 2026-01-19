import crypto from "crypto";
import { validatePassword } from "./passwordPolicy.js";
import { hashPassword, verifyPassword } from "./passwordHash.js";
import { logAuthEvent } from "./auditLogger.js";
import db from "../db.js"; // conexión simulada
