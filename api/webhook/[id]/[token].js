const axios = require('axios');

module.exports = async (req, res) => {
    const { id, token } = req.query;
    
    if (req.method === 'GET') {
        // Handle GET request for fetching webhook data
        try {
            const response = await axios.get(`https://discord.com/api/webhooks/${id}/${token}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(error.response ? error.response.status : 500).json({ error: "Error fetching webhook data." });
        }
    } else if (req.method === 'POST') {
        // Handle POST request to send a message
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: "Message content is required!" });
        }

        try {
            const response = await axios.post(`https://discord.com/api/webhooks/${id}/${token}`, { content });
            res.status(200).json({ message: "Message sent successfully!", response: response.data });
        } catch (error) {
            res.status(error.response ? error.response.status : 500).json({ error: "Error sending message to webhook." });
        }
    } else {
        // Method Not Allowed
        res.status(405).json({ error: "Method Not Allowed" });
    }
};
