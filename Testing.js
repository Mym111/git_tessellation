require('dotenv').config();
console.log('Your OpenAI API Key is:', process.env.OPENAI_API_KEY);

const express = require('express');
const openai = require('openai');

const app = express();
app.use(express.json());

// Instantiate the OpenAIApi directly with the API key
const api = new OpenAIApi({
  apiKey: "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",
});

app.post('/translate', async (req, res) => {
    console.log('Received translation request:', req.body); // Log the incoming request body

    try {
        const response = await api.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a helpful translator..."
                // Rest of the system message
            }, {
                role: "user",
                content: req.body.prompt // Log the prompt to ensure it's received correctly
            }],
        });

        console.log('Received response from OpenAI:', response.data); // Log the full response from OpenAI
        res.json({ translation: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error making request to OpenAI:', error); // Log detailed error if the request fails
        if (error.response) {
            console.error('OpenAI response error:', error.response.data); // Log OpenAI response error details
        }
        res.status(500).send('Error processing your request.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
