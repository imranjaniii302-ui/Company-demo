# Super App Demo - Flask backend (Python)
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder="static")

SERVICES = [
    {"icon": "🚗", "title": "Ride Services", "text": "Bikes, cars aur rickshaw ke liye verified drivers ka network."},
    {"icon": "🛒", "title": "E-Commerce Marketplace", "text": "Verified vendors ke saath khareed o farokht ka digital store."},
    {"icon": "👛", "title": "Digital Wallet", "text": "Instant top-up, transfer aur cashout ke liye secure wallet."},
    {"icon": "🎁", "title": "Daily Rewards", "text": "Loyalty points, daily check-in bonus aur special offers."},
    {"icon": "⚖️", "title": "Legal Services", "text": "Licensed lawyers aur compliance specialists se rabta."},
    {"icon": "🏠", "title": "Real Estate", "text": "Property kharidne, bechne aur kiraye par dene ka marketplace."},
]

REPLIES = {
    "service": "Hamare 20+ modules hain: rides, marketplace, wallet, rewards, legal aur real estate.",
    "wallet": "Wallet me aap top-up, transfer aur cashout kar sakte hain (demo content).",
    "contact": "Contact: hello@example.com (demo email).",
}

@app.route("/")
def home():
    return send_from_directory("static", "index.html")

@app.route("/api/services")
def services():
    return jsonify(SERVICES)

@app.route("/api/chat", methods=["POST"])
def chat():
    msg = (request.get_json(silent=True) or {}).get("message", "").lower()
    for key, reply in REPLIES.items():
        if key in msg:
            return jsonify({"reply": reply})
    return jsonify({"reply": "Shukriya! Services, wallet ya contact ke bare me poochein."})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
