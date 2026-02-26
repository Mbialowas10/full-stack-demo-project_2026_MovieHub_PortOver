// src/types/express.d.ts
import "@clerk/express";

declare module "express-serve-static-core" {
  interface Request {
    auth?: import("@clerk/express").AuthObject; // adds auth to Request
  }
}