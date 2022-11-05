import { compare, hash } from "bcryptjs";

export const hashPassword = async (password) => {
  return hash(password, 12);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
}
