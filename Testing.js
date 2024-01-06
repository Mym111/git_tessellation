require('dotenv').config();
const express = require('express');
const { OpenAIApi } = require("openai");

const app = express();
app.use(express.json({ extended: true, limit: '1mb' }));

// Set the OpenAI API Key directly without using Configuration
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/translate', async (req, res) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a helpful translator."
            }, {
                role: "user",
                content: req.body.prompt
            }],
            max_tokens: 256,
        });

        // Assuming the response structure matches the API's response
        res.json({ translation: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
