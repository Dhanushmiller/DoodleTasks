import { encrypt } from "./crypto.util";

export const sendEncrypted = (res: any, data: any) => {
  const encryptedData = encrypt(JSON.stringify(data));
  return res.json({ data: encryptedData });
};