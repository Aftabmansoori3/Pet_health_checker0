from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routes import analyze
from routes import chat
from routes import history

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(analyze.router)
app.include_router(chat.router)
#app.include_router(history.router)
app.include_router(history.router, prefix="/history")

@app.get("/")
def home():
    return {"message": "API Running"}
