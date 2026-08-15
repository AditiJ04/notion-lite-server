import "./env.js";
import express from "express";
import cors from "cors";
import documentsRouter from "./routes/documents.js";
import http from "http";
import { attachSocket } from "./realtime.js";

const allowedOrigins = [
  "http://localhost:3000",
  "https://notion-lite-client.vercel.app",
];

const app = express();
app.use(cors({origin: allowedOrigins}));
app.use(express.json());
app.use("/documents", documentsRouter);

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
attachSocket(server);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
