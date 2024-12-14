// /public/scripts/script.js

function sendMessage(content) {
    const webhookUrl = '/api/webhooks/12345/some-token/send';  // Replace with the actual API path
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
