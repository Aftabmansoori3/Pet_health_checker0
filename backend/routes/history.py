from fastapi import APIRouter
from database import history_data

router = APIRouter()

#@router.get("/")
@router.get("/history/")
def get_history():
    return history_data