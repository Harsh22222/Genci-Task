import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { configDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import activityRoutes from "./routes/acitivity.routes";

const PORT = process.env.PORT || 8080;
const app = express();
configDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/activity", activityRoutes);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World");
});

app.listen(PORT, function () {
  console.log("App listening on port " + PORT + "🚀");
});
