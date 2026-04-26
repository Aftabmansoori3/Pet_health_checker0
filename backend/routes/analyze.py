from fastapi import APIRouter, UploadFile, File, Form
import json
from datetime import datetime

from cv_model import analyze_image
from models.ai_model import analyze_pet
from database import history_data, save_history

# ✅ NEW: import rules
from utils.pet_rules import get_health_alerts

router = APIRouter()


@router.post("/analyze/")
async def analyze(
    pet_type: str = Form(...),
    symptoms: str = Form(...),
    pet_profile: str = Form(...),
    heart_rate: str = Form(""),
    temperature: str = Form(""),
    activity: str = Form(""),
    image: UploadFile = File(None)
):
    try:
        # ✅ Parse pet profile
        try:
            pet = json.loads(pet_profile)
        except:
            pet = {}

        # 🖼 Image handling
        image_info = ""
        image_text = ""

        if image and image.filename != "":
            try:
                raw_image_info = analyze_image(image)
                image_info = raw_image_info

                image_text = f"""
Image Analysis:
The image looks like: {raw_image_info}
Explain in simple health meaning.
"""
            except:
                image_info = "Image analysis failed"

        # ✅ NEW: Rule-based alerts (VERY IMPORTANT)
        alerts = get_health_alerts(
            pet_type, heart_rate, temperature, activity
        )

        alert_text = "\n".join([f"- {a}" for a in alerts]) if alerts else "No major alerts"

        # ✅ NEW: Use recent history
        recent_cases = history_data[-3:]

        # ✅ OPTIONAL: Load dataset
        try:
            with open("data/pet_dataset.json") as f:
                dataset = json.load(f)
        except:
            dataset = []

        dataset_sample = dataset[:2] if dataset else []

        # 🧠 IMPROVED AI PROMPT
        prompt = f"""
You are a smart veterinary assistant.

Pet Details:
Name: {pet.get("name", "Unknown")}
Age: {pet.get("age", "Unknown")}
Breed: {pet.get("breed", "Unknown")}
Weight: {pet.get("weight", "Unknown")}

Health Data:
Heart Rate: {heart_rate or "Not provided"}
Temperature: {temperature or "Not provided"}
Activity: {activity or "Not provided"}

⚠️ System Alerts:
{alert_text}

Pet Type: {pet_type}

Symptoms:
{symptoms or "Not provided"}

{image_text}

Recent Cases:
{recent_cases}

Reference Cases:
{dataset_sample}

IMPORTANT:
- Use health data + alerts + past cases
- Detect:
  - High temperature → fever
  - High heart rate → stress/pain
  - Low activity → weakness

RULES:
- Simple English
- Short bullet points
- Max 4 points

FORMAT:

Possible Causes:
- ...

Symptoms Meaning:
- ...

Advice:
- ...

When to Visit Vet:
- ...
"""

        # 🤖 AI CALL
        ai_response = analyze_pet({"prompt": prompt})

        # ✅ Safe extraction
        if isinstance(ai_response, dict):
            result_text = ai_response.get("result", str(ai_response))
        else:
            result_text = str(ai_response)

        # 📊 Save history (✅ added date for dashboard filter)
        record = {
            "pet_type": pet_type,
            "symptoms": symptoms,
            "heart_rate": heart_rate,
            "temperature": temperature,
            "activity": activity,
            "image_analysis": image_info,
            "result": result_text,
            "date": str(datetime.now())  # ✅ NEW
        }

        history_data.append(record)
        save_history()

        return {
            "result": result_text,
            "image_analysis": image_info
        }

    except Exception as e:
        return {
            "error": str(e),
            "result": "❌ Backend error"
        }