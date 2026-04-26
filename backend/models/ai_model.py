import os
from dotenv import load_dotenv
from mistralai import Mistral

load_dotenv()

api_key = os.getenv("MISTRAL_API_KEY")

client = Mistral(api_key=api_key)


def analyze_pet(data):
    try:
        print("🧠 analyze_pet called")

        if "prompt" in data:
            prompt = data["prompt"]
        else:
            pet = data.get("pet_type", "pet")
            symptoms = data.get("symptoms", "unknown issue")

            prompt = f"Analyze a {pet} with symptoms: {symptoms}"

        print("🚀 Sending request to Mistral...")

        # ✅ FINAL WORKING VERSION
        response = client.chat.complete(
            model="mistral-small-latest",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        result = response.choices[0].message.content

        return {"result": result}

    except Exception as e:
        return {"result": f"Error: {str(e)}"}