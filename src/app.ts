import cors from "cors";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { router } from "./app/routes/index.route";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { envVars } from "./app/config/env";
import { notFound } from "./app/middleware/notFount";


const app: Application = express();





app.use(
  cors({
    origin: [envVars.FRONTEND_URL, envVars.LOCAL_FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





app.set("trust proxy", 1);



app.use("/api/v1", router);


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to The Biggest Ticketing System Server - TicketFlow!",
    version: "1.0.0",
    status: "Running",
  });
});

// 7. Error Handling (সবার শেষে)
app.use(globalErrorHandler);
app.use(notFound);

export default app;