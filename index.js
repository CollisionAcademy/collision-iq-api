const express = require('express');
const cors = require('cors');
const openai = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new openai.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openaiClient = new openai.OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const completion = await openaiClient.createChatCompletion({
      model: 'gpt-4',
      messages,
    });
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
