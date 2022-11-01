import { hash } from "bcryptjs";

export const hashPassword = async (password) => {
  return hash(password, 12);
};
