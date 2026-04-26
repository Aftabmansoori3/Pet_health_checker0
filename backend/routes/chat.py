from fastapi import APIRouter
from pydantic import BaseModel
from models.ai_model import client
from typing import Optional

router = APIRouter()


# ✅ Request model
class ChatRequest(BaseModel):
    message: str
    pet_type: Optional[str] = None
    heart_rate: Optional[str] = None
    temperature: Optional[str] = None
    breathing_rate: Optional[str] = None
    activity_level: Optional[str] = None


@router.post("/chat")
def chat(req: ChatRequest):
    try:
        # 🧠 Health context
        health_info = f"""
Pet Type: {req.pet_type or "Not provided"}
Heart Rate: {req.heart_rate or "Not provided"}
Temperature: {req.temperature or "Not provided"}
Breathing Rate: {req.breathing_rate or "Not provided"}
Activity Level: {req.activity_level or "Not provided"}
"""

        # 🧠 Prompt
        prompt = f"""
You are a smart veterinary assistant.

Pet Health Data:
{health_info}

User Question:
{req.message}

IMPORTANT:
- Use very simple English
- ONLY bullet points
- Maximum 4 points per section
- DO NOT write paragraphs

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

        # ✅ NEW SDK CALL
        response = client.chat.complete(
            model="mistral-small-latest",
            messages=[
                {
                    "role": "system",
                    "content": "You are a veterinary assistant who follows structured format strictly."
                },
                {"role": "user", "content": prompt}
            ]
        )

        reply = response.choices[0].message.content

        return {
            "result": reply
        }

    except Exception as e:
        print("CHAT ERROR:", e)
        return {
            "result": f"❌ Error: {str(e)}"
        }