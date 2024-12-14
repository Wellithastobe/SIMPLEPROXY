const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API to fetch webhook details (GET)
app.get('/api/webhooks/:id/:token', async (req, res) => {
    const { id, token } = req.params;

    try {
        const response = await axios.get(`https://discord.com/api/webhooks/${id}/${token}`);
        res.status(200).json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: "An error occurred while fetching the webhook data." });
        }
    }
});

// API to send a message to a webhook (POST)
app.post('/api/webhooks/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Message content is required!" });
    }

    try {
        const response = await axios.post(`https://discord.com/api/webhooks/${id}/${token}`, { content });
        res.status(200).json({ message: "Message sent successfully!", response: response.data });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: "An error occurred while sending the message." });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
