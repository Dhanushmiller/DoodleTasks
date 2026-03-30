import { encrypt } from "../utils/crypto.util";

export const encryptMiddleware = (req: any, res: any, next: any) => {
  const oldSend = res.send;

  res.send = function (data: any) {
    try {
      // If response is JSON string → parse it
      let jsonData = data;

      if (typeof data === "string") {
        try {
          jsonData = JSON.parse(data);
        } catch {
          jsonData = data;
        }
      }

      const encryptedData = encrypt(JSON.stringify(jsonData));

      return oldSend.call(this, JSON.stringify({ data: encryptedData }));
    } catch (err) {
      return oldSend.call(this, data);
    }
  };

  next();
};