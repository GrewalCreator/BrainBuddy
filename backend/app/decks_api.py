from flask import Blueprint, jsonify
import os
import json

decks_api = Blueprint("decks_api", __name__)

CACHE_DIR = "../../frontend/src/assets/cache"

@decks_api.route("/api/getDecks", methods=["GET"])
def get_decks():
    decks = []
    try:
        for filename in os.listdir(CACHE_DIR):
            if filename.endswith(".json"):
                with open(os.path.join(CACHE_DIR, filename), "r", encoding="utf-8") as file:
                    deck = json.load(file)
                    deck_title = filename.replace(".json", "").replace("_", " ")
                    decks.append({"title": deck_title, "cards": deck})
        return jsonify({"decks": decks})
    except Exception as e:
        return jsonify({"error": str(e)}), 500