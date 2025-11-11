import express from "express";
import fetch from "node-fetch";
import pkg from "scramjet";

const { StringStream } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send("Please provide a URL using ?url=YOUR_URL");

    try {
        const response = await fetch(targetUrl);
        const html = await response.text();

        // Optional: modify the HTML using Scramjet if needed
        const processedHtml = await StringStream.from(html)
            .toArray()
            .then(lines => lines.join("")); // currently just joins back into a string

        res.setHeader("Content-Type", "text/html");
        res.send(processedHtml);
    } catch (err) {
        res.status(500).send("Error fetching URL: " + err.toString());
    }
});

app.listen(PORT, () => {
    console.log(`Scramjet proxy running on port ${PORT}`);
});
