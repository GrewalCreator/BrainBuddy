from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
import torch
from sklearn.metrics import accuracy_score  # For evaluation metric

# Load datasets
history_ds = load_dataset("brucewlee1/mmlu-high-school-world-history")
geography_ds = load_dataset("joey234/mmlu-high_school_geography-neg")
science_ds = load_dataset("derek-thomas/ScienceQA")
math_ds = load_dataset("brucewlee1/mmlu-high-school-mathematics")
english_ds = load_dataset("tasksource/english-grading")

# Load a pretrained model and tokenizer (using a general BERT model for demonstration)
model_name = "bert-base-uncased"  # You can change this to any model that fits your task (e.g., GPT-2, RoBERTa)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Assuming binary classification (adjust `num_labels` if necessary)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)

# Preprocessing function to tokenize data
def preprocess_function(examples):
    # Adjust based on dataset format (text field name might be different)
    return tokenizer(examples['text'], truncation=True, padding=True, max_length=512)

# Preprocess each dataset
history_ds = history_ds.map(preprocess_function, batched=True)
geography_ds = geography_ds.map(preprocess_function, batched=True)
science_ds = science_ds.map(preprocess_function, batched=True)
math_ds = math_ds.map(preprocess_function, batched=True)
english_ds = english_ds.map(preprocess_function, batched=True)

# Define evaluation metric function (for binary classification: accuracy)
def compute_metrics(p):
    predictions, labels = p
    predictions = torch.argmax(torch.tensor(predictions), dim=-1)
    accuracy = accuracy_score(labels, predictions)
    return {"accuracy": accuracy}

# Define training arguments
training_args = TrainingArguments(
    output_dir='./results',              # output directory
    evaluation_strategy="epoch",         # evaluation strategy to use during training
    learning_rate=2e-5,                  # learning rate
    per_device_train_batch_size=16,      # batch size for training
    per_device_eval_batch_size=64,       # batch size for evaluation
    num_train_epochs=3,                  # number of training epochs
    weight_decay=0.01,                   # strength of weight decay
    device="cuda" if torch.cuda.is_available() else "cpu",  # Use GPU if available, else CPU
    logging_dir='./logs',                # directory for storing logs
)

# Initialize Trainer
trainer = Trainer(
    model=model, 
    args=training_args, 
    train_dataset=history_ds['train'],  # You can replace this with any dataset
    eval_dataset=history_ds['test'],    # Evaluate on the test split
    compute_metrics=compute_metrics     # Adding evaluation metrics function
)

# Fine-tune the model on the History dataset
trainer.train()

# After training on History, you can switch to other subjects by changing datasets:
# Example:
# trainer.train_dataset = geography_ds['train']
# trainer.eval_dataset = geography_ds['test']
# trainer.train()

