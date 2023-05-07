import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv";

// import { prisma } from "../utils/connection";
import { checkParams } from "../utils/middlewares";

config();
const router = Router();

const OpenAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const OpenAI_API = new OpenAIApi(OpenAIConfig);

router.get("/", async (req, res) => {
  try {
    // const decals = await prisma.decal.findMany();
    res.json("Everything works!");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.json(err.message);
    }
  }
});

router.post("/test-api", async (req, res) => {
  try {
    const response = await OpenAI_API.createImage({
      prompt: "Hello",
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;

    res.json({ photo: image });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.json(err.message);
    }
  }
});

router.post("/", checkParams(["prompt"]), async (req, res) => {
  try {
    const { prompt } = req.body;

    console.log(req.body);

    const response = await OpenAI_API.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;

    res.json({ photo: image });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.json(err.message);
    }
  }
});

export default router;
