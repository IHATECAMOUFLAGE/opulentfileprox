import express from "express";
import { StringStream } from "scramjet";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/scramjet", async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send("Provide ?url=");

  try {
    const response = await fetch(target);
    const text = await response.text();

    const result = await StringStream.from(text)
      .lines()
      .map(line => line) // just pass-through
      .toArray();

    res.send(result.join("\n"));
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(PORT, () => {
  console.log(`Scramjet proxy running on port ${PORT}`);
});
