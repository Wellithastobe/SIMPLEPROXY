const axios = require('axios');

// The serverless function to handle requests to the webhook URL
module.exports = async (req, res) => {
    const { id, token } = req.query; // Extract the id and token from the URL parameters

    // Handle GET request to retrieve webhook details
    if (req.method === 'GET') {
        try {
            // Make a request to the Discord API to fetch webhook details
            const response = await axios.get(`https://discord.com/api/webhooks/${id}/${token}`);
            res.status(200).json(response.data); // Send the webhook data as JSON response
        } catch (error) {
            // If an error occurs, send an error response
            res.status(error.response ? error.response.status : 500).json({
                error: "Error fetching webhook data.",
                details: error.response ? error.response.data : error.message,
            });
        }
    } 
    // Handle POST request to send a message to the webhook
    else if (req.method === 'POST') {
        const { content } = req.body; // Get the message content from the request body

        // If no content is provided, return an error response
        if (!content) {
            return res.status(400).json({ error: "Message content is required!" });
        }

        try {
            // Send the message to the Discord webhook using the POST method
            const response = await axios.post(`https://discord.com/api/webhooks/${id}/${token}`, {
                content: content, // Send the content to the webhook
            });
            res.status(200).json({
                message: "Message sent successfully!",
                response: response.data, // Return the response from Discord
            });
        } catch (error) {
            // If an error occurs, send an error response
            res.status(error.response ? error.response.status : 500).json({
                error: "Error sending message to webhook.",
                details: error.response ? error.response.data : error.message,
            });
        }
    } else {
        // Method Not Allowed (if a request is made with a method other than GET or POST)
        res.status(405).json({ error: "Method Not Allowed" });
    }
};
