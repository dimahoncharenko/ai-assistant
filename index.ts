import express from "express";
import { config } from "dotenv";
import cors from "cors";

import dalleAPI from "./api/dall-e";

config();

const app = express();
app.set("PORT", process.env.PORT || 5000);
app.use(express.json());
app.use(cors());

app.use("/api/v1/dall-e/", dalleAPI);

app.listen(app.get("PORT"), () =>
  console.log(`Server ready at http://localhost:${app.get("PORT")}`)
);
