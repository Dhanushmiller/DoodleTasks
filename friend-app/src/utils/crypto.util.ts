import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = "12345678901234567890123456789012";

// Encrypt
export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(16); 
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // attach IV with data
  return iv.toString("hex") + ":" + encrypted;
};

// Decrypt
export const decrypt = (encryptedText: string) => {
  const [ivHex, data] = encryptedText.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};