function sendMessage(content) {
    // Extract the ID and token dynamically (from user input or URL parameters)
    const id = '12345'; // Replace with dynamic ID
    const token = 'some-token'; // Replace with dynamic token

    const webhookUrl = `/api/webhooks/${id}/${token}/send`;  // Construct the correct URL

    // Send the POST request to the API
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content })
    })
    .then(response => response.json())
    .then(data => {
        // Handle success
        console.log('Success:', data);
        alert('Message sent successfully!');
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
        alert('Failed to send the message. Please try again.');
    });
}
