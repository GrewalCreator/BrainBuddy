from flask import Blueprint, jsonify
from flask_login import login_required

views = Blueprint("views", __name__)


@views.route("/")
def root():
    return jsonify({"message": "Welcome to the BrainBuddy API!"})


@views.route("/api/home")
@login_required
def home():
    return jsonify({"message": "This is the Home page API."})


@views.route("/api/about")
@login_required
def about():
    return jsonify({"message": "This is the About page API."})


@views.route("/api/decks")
@login_required
def decks():
    return jsonify({"message": "This is the Decks page API."})
