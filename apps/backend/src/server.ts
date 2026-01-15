import app from "./app";
import { Server } from "http";

const PORT: string | number = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/api/docs`);
});

export {server};