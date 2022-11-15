import crypto from "node:crypto";
import util from "node:util";

const randomBytes = util.promisify(crypto.randomBytes);

export const generateLinkCode = async () => {
  const buf = await randomBytes(8);

  return buf.toString("hex");
};