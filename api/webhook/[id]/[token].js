const axios = require('axios');

export default async (req, res) => {
    const { id, token } = req.query; // Access dynamic parameters

    if (req.method === 'GET') {
        try {
            const response = await axios.get(`https://discord.com/api/webhooks/${id}/${token}`);
            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(error.response?.status || 500).json({
                error: error.response?.data || 'An error occurred while fetching webhook data.',
            });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
};
