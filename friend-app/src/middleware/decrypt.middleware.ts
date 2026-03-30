import { decrypt } from "../utils/crypto.util";

export const decryptMiddleware = (req: any, res: any, next: any) => {
  try {
    // decrypt if "data" exists
    if (req.body && req.body.data) {
      const decrypted = decrypt(req.body.data);
      req.body = JSON.parse(decrypted);
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: "Decryption failed" });
  }
};