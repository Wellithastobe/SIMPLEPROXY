const axios = require('axios');

export default async (req, res) => {
    const { id, token } = req.query; // Access dynamic parameters
    const { content } = req.body;

    if (req.method === 'POST') {
        if (!content) {
            return res.status(400).json({ error: 'Message content is required!' });
        }

        try {
            const response = await axios.post(`https://discord.com/api/webhooks/${id}/${token}`, { content });
            return res.status(200).json({ message: 'Message sent successfully!', response: response.data });
        } catch (error) {
            return res.status(error.response?.status || 500).json({
                error: error.response?.data || 'An error occurred while sending the message.',
            });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};
