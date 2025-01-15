import json
import os
from flask import Blueprint, jsonify
from flask_login import login_required

views = Blueprint("views", __name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Base directory of this file
CACHE_DIR = os.path.join(BASE_DIR, "../../frontend/src/assets/cache")

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


@views.route("/api/getDecks")
@login_required
def get_decks():
    decks = []


    # Check for .json files in the directory
    json_files = [f for f in os.listdir(CACHE_DIR) if f.endswith(".json")]


    try:
        # Read and process each .json file
        for filename in json_files:
            file_path = os.path.join(CACHE_DIR, filename)
            with open(file_path, "r", encoding="utf-8") as file:
                deck = json.load(file)
                deck_title = filename.replace(".json", "").replace("_", " ")
                decks.append({"title": deck_title, "cards": deck})

        return jsonify({"decks": decks}), 200
    except Exception as e:

        return jsonify({"error": f"An error occurred: {str(e)}"}), 500