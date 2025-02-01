import jsonwebtoken from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET

export const generateJwtToken = (userId) => {
  const payload = {
    sub: userId,
    issuedAt: new Date(),
  };

  const options = {
    expiresIn: "1h",
  };

  try {
    const token = jsonwebtoken.sign(payload, jwtSecret, options);
    return token;
  } catch (error) {
    throw new Error("Internal server error");
  }
};