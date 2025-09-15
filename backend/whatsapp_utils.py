import os
from twilio.rest import Client
from dotenv import load_dotenv
from twilio.base.exceptions import TwilioRestException

# loading the environment variables
load_dotenv()

# fetching the necessary credentials
account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_number = os.getenv("TWILIO_WHATSAPP_NUMBER")

client = Client(account_sid, auth_token)

# for sending the messages
def send_whatsapp_message(to_number: str, message: str):

    """ Send a WhatsApp message using Twilio"""
    try:
        msg = client.messages.create(
            body = message,
            from_ = twilio_number,
            to = to_number)

        print(f"WhatsApp message sent. SID: {msg.sid}")
        return msg.sid
    except TwilioRestException as e:
        print(f"Twilio error: {e}")
        raise
