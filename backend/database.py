import json
import os

FILE_NAME = "history.json"

# Load existing data
if os.path.exists(FILE_NAME):
    with open(FILE_NAME, "r") as f:
        history_data = json.load(f)
else:
    history_data = []

# Save function
def save_history():
    with open(FILE_NAME, "w") as f:
        json.dump(history_data, f, indent=4)