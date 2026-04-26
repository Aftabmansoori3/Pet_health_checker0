from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ import routes
from routes.analyze import router as analyze_router
from routes.chat import router as chat_router
from routes.history import router as history_router

app = FastAPI()

# ✅ CORS (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ root route
@app.get("/")
def home():
    return {"message": "✅ Backend Running"}

# ✅ include routers
app.include_router(analyze_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
app.include_router(history_router, prefix="/api")