import express from 'express';
import cors from "cors";
import { Request, Response, NextFunction } from 'express'
require('dotenv').config();

import authRouter from "./api/routes/auth.router";
import { CustomError } from './utils'
import { getContactLocationByIpAddress } from './infrustructure/user-location-detector.service';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.get("/user-location", async (req: Request, res: Response) => {
  const userIpAddress = ((req.headers['x-forwarded-for'] as string) || '').split(',')[0].trim() || req.socket.remoteAddress;
    
  const userLocation = await getContactLocationByIpAddress(userIpAddress);

  res.status(200).json(userLocation)
})

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
