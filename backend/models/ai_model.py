import os
from dotenv import load_dotenv
from mistralai.client import MistralClient

load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")

client = MistralClient(api_key=api_key)


def analyze_pet(data):
    try:
        print("🧠 analyze_pet called")

        # 🔥 If prompt is passed → use it
        if "prompt" in data:
            prompt = data["prompt"]
            print("📩 Using custom prompt")

        else:
            print("📩 Using fallback prompt")

            pet = data.get("pet_type", "pet")
            symptoms = data.get("symptoms", "unknown issue")
            pet_profile = data.get("pet_profile", {})

            prompt = f"""
You are a veterinary assistant.

Pet Details:
Name: {pet_profile.get("name", "Unknown")}
Age: {pet_profile.get("age", "Unknown")}
Breed: {pet_profile.get("breed", "Unknown")}
Weight: {pet_profile.get("weight", "Unknown")}

Analyze a {pet} with symptoms: {symptoms}.

IMPORTANT:
- Use pet AGE, BREED and WEIGHT
- Personalize answer

Format:

Possible Causes:
- ...

Symptoms meaning:
- ...

Advice:
- ...

When to visit vet:
- ...
"""

        # 🚀 Call Mistral API
        print("🚀 Sending request to Mistral...")

        response = client.chat(
            model="mistral-small-latest",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        result = response.choices[0].message.content

        print("✅ Mistral response received")

        return {"result": result}

    except Exception as e:
        print("❌ ERROR:", str(e))

        # 🔥 IMPORTANT FIX: always return result
        return {"result": f"Error: {str(e)}"}