import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFount";
import { router } from "./app/routes/index.route";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://seecto.hurairaconsultancy.com",
      "https://seect.admin.hurairaconsultancy.com",
      "https://seecto.org",
      "http://seecto.org",
      "https://www.seecto.org",
      "http://www.seecto.org",
      "https://publication.seecto.org",
      "http://publication.seecto.org",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "100MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("trust proxy", 1);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to The Seekto Server - Seekto!",
    version: "1.0.0",
    status: "Running",
  });
});

// 7. Error Handling (সবার শেষে)
app.use(globalErrorHandler);
app.use(notFound);

export default app;
