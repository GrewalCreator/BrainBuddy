from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def root():
    return jsonify({"message": "Welcome to the BrainBuddy API!"})

@app.route("/api/home")
def home():
    return jsonify({"message": "This is the Home page API."})

@app.route("/api/about")
def about():
    return jsonify({"message": "This is the About page API."})

@app.route("/api/decks")
def decks():
    return jsonify({"message": "This is the Decks page API."})

if __name__ == "__main__":
    app.run(debug=True)
