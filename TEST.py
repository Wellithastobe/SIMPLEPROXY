import requests

def send_discord_message(webhook_url, message):
    """Sends a message to the specified Discord webhook."""
    payload = {
        "content": message
    }
    
    try:
        response = requests.post(webhook_url, json=payload)
        if response.status_code == 204:
            print("Message sent successfully!")
        else:
            print(f"Failed to send message. HTTP Status Code: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    print("Discord Webhook Messenger")
    webhook_url = input("Enter the Discord webhook URL: ").strip()
    message = input("Enter the message you want to send: ").strip()
    
    if webhook_url and message:
        send_discord_message(webhook_url, message)
    else:
        print("Webhook URL and message cannot be empty!")

if __name__ == "__main__":
    main()
