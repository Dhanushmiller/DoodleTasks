import express from "express";
import authRoutes from "./routes/auth.routes";
import friendRoutes from "./routes/friend.routes";
import { errorHandler } from "./middleware/error.middleware";
import { encryptMiddleware } from "./middleware/encrypt.middleware";
import { decryptMiddleware } from "./middleware/decrypt.middleware";

const app = express();

app.use(express.json());

// ✅ Decrypt first
app.use(decryptMiddleware);

// ✅ Encrypt responses
app.use(encryptMiddleware);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);

// ✅ Error handler MUST be last
app.use(errorHandler);

export default app;