require('dotenv').config();
const express = require('express');
const openai = require('openai');

const app = express();
app.use(express.json());

// Assuming the OpenAIApi object is exported directly, we don't use new to instantiate it
const api = new openai.OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/translate', async (req, res) => {
    try {
        const response = await api.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a helpful translator..."
                // Rest of the system message
            }, {
                role: "user",
                content: req.body.prompt
            }],
        });
        res.json({ translation: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing your request.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
