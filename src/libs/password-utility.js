import bcrypt from "bcrypt";

const saltRound = 10;

export const generateHashForPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRound);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

export const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};