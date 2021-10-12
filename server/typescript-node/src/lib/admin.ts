const jwt = require("jsonwebtoken");

export function generateJWT(): string {
  const token = jwt.sign(
    { name: "admin", password: "admin123" },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "3600000",
    }
  );
  return token;
}

export function authenticateToken(token: string) {
  const payload = jwt.verify(token, process.env.TOKEN_SECRET);
  if (payload.name === "admin" && payload.password === "admin123") return true;
  return false;
}
