// src/types/express/index.d.ts
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    auth?: {
      userId?: string;
      sessionId?: string;
      claims?: Record<string, any>;
    };
  }
}