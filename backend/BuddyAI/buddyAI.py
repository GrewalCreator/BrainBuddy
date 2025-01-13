import openai
from openai import OpenAI
from flask import Blueprint, request, jsonify

client = OpenAI(api_key="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")



buddyAI = Blueprint("buddyAI", __name__)

@buddyAI.route("/generateAI", methods=["POST"])
def AIResponse():
    try:
        # Parse the question from the request JSON
        data = request.get_json()
        question = data.get("question", "")

        if not question:
            return jsonify({"error": "Question is required"}), 400

        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a Tutor for students, you are detailed, accurate and polite."},
                {"role": "user", "content": question}
            ]
        )

        # Extract the AI's response
        answer = response['choices'][0]['message']['content']

        # Return the response to the frontend
        return jsonify({"question": question, "answer": answer})

    except Exception as e:
        return jsonify({"error": str(e)}), 500




'''
cache_directory = "F:/hugging-face"

# Set environment variables to ensure consistent behavior
os.environ["HF_HOME"] = cache_directory
os.environ["TRANSFORMERS_CACHE"] = f"{cache_directory}/hf-cache"

# Load the dataset and cache it to the specified directory
dataset = load_dataset("HuggingFaceFW/fineweb-edu", "default", cache_dir=cache_directory)


model_name = "t5-small" 
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# Load dataset
dataset = load_dataset("HuggingFaceFW/fineweb-edu", "default")

# Preprocess dataset for T5
def preprocess_function(examples):
    # Extract the text column for input
    inputs = [f"Summarize or explain: {text}" for text in examples['text']]  # Adjust prompt as needed

    targets = ["Relevant educational content"] * len(inputs)

    # Tokenize inputs and labels
    model_inputs = tokenizer(inputs, truncation=True, padding=True, max_length=512)
    labels = tokenizer(targets, truncation=True, padding=True, max_length=512)
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs

# Process dataset
dataset = dataset.map(preprocess_function, batched=True)

# Split dataset into train and validation sets
dataset = dataset.train_test_split(test_size=0.2)

# Training arguments
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="steps",
    eval_steps=100,
    learning_rate=3e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
    logging_dir="./logs",
    save_steps=500,
)

# Define metrics for evaluation
def compute_metrics(eval_pred):
    predictions, labels = eval_pred

    # Extract logits from predictions
    if isinstance(predictions, tuple):
        predictions = predictions[0]

    # Convert logits to token IDs by taking the argmax
    predictions = torch.argmax(torch.tensor(predictions), axis=-1)

    # Decode predictions and labels
    decoded_preds = tokenizer.batch_decode(predictions, skip_special_tokens=True)
    decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)

    # Compute accuracy
    from sklearn.metrics import accuracy_score
    accuracy = accuracy_score(decoded_labels, decoded_preds)
    return {"accuracy": accuracy}

# Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
)

# Fine-tune the model
trainer.train()

# Evaluate the model
eval_results = trainer.evaluate()
print("Evaluation Results:", eval_results)

# Save the fine-tuned model
model.save_pretrained("./t5_ai_tutor")
tokenizer.save_pretrained("./t5_ai_tutor")

'''

'''
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, Trainer, TrainingArguments
from datasets import load_dataset

# Load T5 model and tokenizer
model_name = "t5-small"  # Use "t5-base" or "t5-large" for better performance if resources allow
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# Load dataset (replace with your dataset)
dataset = load_dataset("brucewlee1/mmlu-high-school-world-history")

# Preprocess dataset for T5
def preprocess_function(examples):
    # Format inputs for T5
    inputs = [
        f"explain: {q} A) {opts[0]} B) {opts[1]} C) {opts[2]} D) {opts[3]}"
        for q, opts in zip(examples['centerpiece'], examples['options'])
    ]

    # Extract the first element of each sublist in 'correct_options_literal'
    targets = [
        str(target[0]) if target and isinstance(target, list) else ""
        for target in examples["correct_options_literal"]
    ]

    # Tokenize inputs and labels
    model_inputs = tokenizer(inputs, truncation=True, padding=True, max_length=512)
    labels = tokenizer(targets, truncation=True, padding=True, max_length=512)
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs

# Process dataset
dataset = dataset.map(preprocess_function, batched=True)

# Split dataset into train and validation sets
dataset = dataset["test"].train_test_split(test_size=0.2)

# Define training arguments
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="steps",
    eval_steps=100,
    learning_rate=3e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
    logging_dir="./logs",
    save_steps=500,
)

# Define metrics for evaluation
def compute_metrics(eval_pred):
    predictions, labels = eval_pred

    # Extract logits from predictions
    if isinstance(predictions, tuple):
        predictions = predictions[0]

    # Convert logits to token IDs by taking the argmax
    predictions = torch.argmax(torch.tensor(predictions), axis=-1)

    # Decode predictions and labels
    decoded_preds = tokenizer.batch_decode(predictions, skip_special_tokens=True)
    decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)

    # Compute accuracy
    from sklearn.metrics import accuracy_score
    accuracy = accuracy_score(decoded_labels, decoded_preds)
    return {"accuracy": accuracy}

# Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
)

# Fine-tune the model
trainer.train()

# Evaluate the model
eval_results = trainer.evaluate()
print("Evaluation Results:", eval_results)

# Save the fine-tuned model
model.save_pretrained("./t5_ai_tutor")
tokenizer.save_pretrained("./t5_ai_tutor")

'''
