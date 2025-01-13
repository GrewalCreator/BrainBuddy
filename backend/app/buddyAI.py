from datetime import datetime
import re
import openai
from flask import Blueprint, json, request, jsonify
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Set the OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define the Flask Blueprint
buddyAI = Blueprint("buddyAI", __name__)

CACHE_DIR = "../../frontend/src/assets/cache"

@buddyAI.route("/generateFlashcards", methods=["POST"])
def flashcards():
    try:
        data = request.get_json()
        topic = data.get("topic", "").strip()
        grade = data.get("grade", "").strip()
        additional_info = data.get("additionalInfo", "").strip()

        # Validate input
        if not topic or not grade:
            return jsonify({"error": "Topic and grade level are required."}), 400


        prompt = (
            f"Generate a set of 5 flashcards on the topic '{topic}' for students in grade level '{grade}'. "
            f"Each flashcard should contain a question and a corresponding answer. "
            f"{additional_info}\n\n"
            "Respond with only a JSON object in this format:\n"
            '[{"question": "What is the capital of France?", "answer": "Paris"}, ...]'
        )

        from openai import OpenAI
        client = OpenAI()

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a Tutor for students, you are detailed, accurate, and polite."},
                {
                    "role": "user",
                    "content": prompt,
                    "max_tokens": 150
                }
            ]
        )

        flashcards_raw = completion.choices[0].message.content
        cleaned_flashcards = re.sub(r"```json|```", "", flashcards_raw).strip()
        print(cleaned_flashcards)

        try:
            # Locate and parse the JSON object
            flashcards = json.loads(cleaned_flashcards)
            if not isinstance(flashcards, list):
                raise ValueError("The response is not a list of flashcards.")
        except Exception as e:
            return jsonify({"error": f"Failed to parse flashcards from response: {str(e)}"}), 500
        
        os.makedirs(CACHE_DIR, exist_ok=True)

        # Create a unique file name
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_file_name = f"{topic}_{grade}_{timestamp}.json"
        file_path = os.path.join(CACHE_DIR, unique_file_name)

        # Save the flashcards to the file
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(flashcards, f, ensure_ascii=False, indent=4)

        # Return the flashcards as a JSON response
        return jsonify({"flashcards": flashcards})

    except Exception as e:
        print(str(e))
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@buddyAI.route("/generateAI", methods=["POST"])
def AIResponse():
    try:
        # Parse the question from the request JSON
        data = request.get_json()
        question = data.get("question", "").strip()

        if not question:
            return jsonify({"error": "Question is required"}), 400

        from openai import OpenAI
        client = OpenAI()

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a Tutor for students, you are detailed, accurate, and polite."},
                {
                    "role": "user",
                    "content": question,
                    "max_tokens": 150
                }
            ]
        )
        answer = completion.choices[0].message.content

        # Return the response to the frontend
        return jsonify({"question": question, "answer": answer})

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
