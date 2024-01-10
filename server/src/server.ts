require("dotenv").config();

import express, { NextFunction, Response } from "express";
import cors from "cors";
import path from "path";
import http from "http";

import { Server as SocketIO } from "socket.io";

import authController from "./controllers/AuthController";

const app = express();
const server = http.createServer(app);

app.use((_, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH"
  );
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  response.header("Access-Control-Expose-Headers", "x-total-count");

  return next();
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const io = new SocketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use((request: any, response: Response, next: NextFunction) => {
  request.io = io;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/authenticate", authController);

app.get("/", (_, res) => {
  return res.json({ status: "OK", data: new Date().toLocaleString() });
});

const port = process.env.PORT || 3333;

async function initialize() {
  server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

initialize();
