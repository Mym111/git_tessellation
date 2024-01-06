require('dotenv').config();
const express = require('express');
const { OpenAIApi } = require('openai');

const app = express();
app.use(express.json());

// Instantiate the OpenAIApi directly with the API key
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this environment variable is set in your .env file
});

app.post('/translate', async (req, res) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", // Use the appropriate model for your use case
            messages: [{
                role: "system",
                content: "You are a helpful translator. You will get a message from the user and they want you to re-word it in a pretentious or arrogant way, with a touch of humour. Mix in Shakespearean language and act like a haughty rich nobleman."
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
