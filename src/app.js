import express from "express";
import cors from "cors";
import router from "./controllers/authController";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });


const app = express();
app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 4000);
app.use(router)

export default app;