import express from 'express';
import cors from "cors";
import { Request, Response, NextFunction } from 'express'

import authRouter from "./api/routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
