// Testing.js
require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Load the API key from environment variables
});
const openai = new OpenAIApi(configuration);

app.post('/translate', async (req, res) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", // or your preferred model
            messages: [{
                role: "system",
                content: "You are a helpful translator."
            }, {
                role: "user",
                content: req.body.prompt
            }],
        });
        res.json({ translation: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
