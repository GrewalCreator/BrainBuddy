from flask import Blueprint, jsonify

views = Blueprint("views", __name__)

@views.route("/")
def root():
    return jsonify({"message": "Welcome to the BrainBuddy API!"})

@views.route("/api/home")
def home():
    return jsonify({"message": "This is the Home page API."})

@views.route("/api/about")
def about():
    return jsonify({"message": "This is the About page API."})

@views.route("/api/decks")
def decks():
    return jsonify({"message": "This is the Decks page API."})