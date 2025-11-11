import express from "express";
import fetch from "node-fetch";
import pkg from "scramjet";

const { StringStream } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const response = await fetch("https://example.com"); // replace with your target URL
        const text = await response.text();

        // example of using StringStream
        const result = await StringStream.from(text)
            .map(line => line.toUpperCase())
            .toArray();

        res.send(result.join("\n"));
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.listen(PORT, () => {
    console.log(`Scramjet proxy running on port ${PORT}`);
});
