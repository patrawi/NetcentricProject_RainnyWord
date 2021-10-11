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

// function authenticateToken(token: string) {
//       const authHeader = req.headers['authorization']
//       const token = authHeader && authHeader.split(' ')[1]

//       if (token == null) return res.sendStatus(401)

//       jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
//         console.log(err)

//         if (err) return res.sendStatus(403)

//         req.user = user

//         next()
//       })
//     }
